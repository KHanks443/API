import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("./items.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            qty INTEGER NOT NULL
        )
    `);
});

export default db;
