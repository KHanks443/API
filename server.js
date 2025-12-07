import express from "express";
import db from "./db.js";

const app = express();
app.use(express.json());

// GET all items
app.get("/items", (req, res) => {
    db.all("SELECT * FROM items", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET one item
app.get("/items/:id", (req, res) => {
    db.get("SELECT * FROM items WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "Item not found" });
        res.json(row);
    });
});

// CREATE an item
app.post("/items", (req, res) => {
    const { name, qty } = req.body;
    db.run(
        "INSERT INTO items (name, qty) VALUES (?, ?)",
        [name, qty],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, name, qty });
        }
    );
});

// UPDATE an item
app.put("/items/:id", (req, res) => {
    const { name, qty } = req.body;
    db.run(
        "UPDATE items SET name = ?, qty = ? WHERE id = ?",
        [name, qty, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0)
                return res.status(404).json({ message: "Item not found" });
            res.json({ id: req.params.id, name, qty });
        }
    );
});

// DELETE an item
app.delete("/items/:id", (req, res) => {
    db.run(
        "DELETE FROM items WHERE id = ?",
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0)
                return res.status(404).json({ message: "Item not found" });
            res.json({ message: "Item deleted" });
        }
    );
});

app.listen(3000, () => {
    console.log("API running on http://localhost:3000");
});
