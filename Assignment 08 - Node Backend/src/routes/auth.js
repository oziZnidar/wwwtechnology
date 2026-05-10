import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { get_db } from "../db.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

//Middleware
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const db = get_db();
    db.get("SELECT id, email FROM users WHERE id = ?", [decoded.sub], (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: "Unauthorized: User no longer exists" });
      }

      req.user = {
        id: user.id,
        email: user.email
      };
      
      next();
    });
  });
};

// /auth/signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const db = get_db();

  try {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    const query = "INSERT INTO users (email, password_hash) VALUES (?, ?)";

    db.run(query, [email, password_hash], function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(409).json({ error: "Email already exists" });
        }
        console.error(err);
        return res.status(500).json({ error: `Database error: ${err.message}` });
      }

      console.log(`User created with ID: ${this.lastID}`);
      return res.status(201).json({ 
        id: this.lastID, 
        email: email 
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error during signup" });
  }
});

// /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const db = get_db();
  const query = "SELECT id, password_hash FROM users WHERE email = ?";

  db.get(query, [email], async (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: `Database error: ${err.message}` });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const payload = { sub: user.id };
      const options = { expiresIn: "1h" };
      const token = jwt.sign(payload, JWT_SECRET, options);

      return res.status(200).json({ token });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error during login" });
    }
  });
});

export default router;