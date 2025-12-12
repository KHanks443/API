const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/items", (req, res) => {
    db.all("SELECT * FROM items", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.get("/items/:id", (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM items WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ message: "Item not found" });
        } else {
            res.json(row);
        }
    });
});

app.post("/items", (req, res) => {
    const { name, quantity } = req.body;

    db.run(
        "INSERT INTO items (name, quantity) VALUES (?, ?)",
        [name, quantity],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({
                    id: this.lastID,
                    name,
                    quantity
                });
            }
        }
    );
});

app.put("/items/:id", (req, res) => {
    const id = req.params.id;
    const { name, quantity } = req.body;

    db.run(
        "UPDATE items SET name = ?, quantity = ? WHERE id = ?",
        [name, quantity, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else if (this.changes === 0) {
                res.status(404).json({ message: "Item not found" });
            } else {
                res.json({ message: "Item updated successfully" });
            }
        }
    );
});

app.delete("/items/:id", (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM items WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: "Item not found" });
        } else {
            res.json({ message: "Item deleted successfully" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
