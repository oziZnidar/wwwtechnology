import express from "express";
import { get_db } from "../db.js";
import { requireAuth } from "./auth.js";

const router = express.Router();
const query_get_item_by_id = "SELECT id, name, description, owner_user_id, created_at FROM items WHERE id = ?";

function get_by_id(db, id) {
  return new Promise((resolve, reject) => {
    db.get(query_get_item_by_id, id, (err, item) => {
      if (err) return reject(new Error(`Database error ${err.message}`));
      resolve(item);
    });
  });
}

// GET all items (Unprotected)
router.get("/", async (req, res) => {
  const db = get_db();
  db.all("SELECT * FROM items ORDER BY id DESC", (err, items) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(items);
  });
});

// GET by ID (Unprotected)
router.get("/:id", async (req, res) => {
  const db = get_db();
  const item = await get_by_id(db, req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  return res.status(200).json(item);
});

// PROTECTED ROUTES BELOW

router.post("/", requireAuth, async (req, res) => {
  const { name, description } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });

  const db = get_db();
  const query = "INSERT INTO items (name, description, owner_user_id) VALUES (?, ?, ?)";

  // Use req.user.id from the middleware instead of hardcoded 1
  db.run(query, [name, description || null, req.user.id], async function (err) {
    if (err) return res.status(500).json({ error: err.message });
    const created = await get_by_id(db, this.lastID);
    return res.status(201).json(created);
  });
});

router.put("/:id", requireAuth, async (req, res) => {
  const { name, description } = req.body || {};
  const db = get_db();

  const item = await get_by_id(db, req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });

  db.run("UPDATE items SET name = ?, description = ? WHERE id = ?", 
    [name, description || null, req.params.id], async function (err) {
    if (err) return res.status(500).json({ error: err.message });
    const updated = await get_by_id(db, req.params.id);
    return res.status(200).json(updated);
  });
});

router.delete("/:id", requireAuth, async (req, res) => {
  const db = get_db();
  const item = await get_by_id(db, req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });

  db.run("DELETE FROM items WHERE id = ?", req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(204).send();
  });
});

export default router;