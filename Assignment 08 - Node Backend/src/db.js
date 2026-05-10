import sqlite3 from "sqlite3";
import path from "path";

const __dirname = import.meta.dirname;
let db;

export const db_initialize_create = async () => {
  let filename = path.join(__dirname, "db", "data.db");

  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(filename, (err) => {
      if (err) return reject(err);

      db.serialize(() => {
        db.run(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
          )
        `);

        db.run(`
          CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            owner_user_id INTEGER,
            FOREIGN KEY (owner_user_id) REFERENCES users (id)
          )
        `, (err) => {
          if (err) return reject(err);
          resolve(db);
        });
      });
    });
  });
};

export const get_db = () => {
  if (!db) throw new Error("DB not initialized. Call db_initialize_create() first.");
  return db;
};