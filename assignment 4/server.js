const express = require("express");
const app = express();
app.use(express.json());

const sqlite3 = require("sqlite3").verbose();
//2.1
const db = new sqlite3.Database("database.db");

function validateStatus(status) {
  if (status == "to-read" || status == "reading" || status == "completed")
    return true;
  return false;
}

//2.4
const sql = `
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  year INTEGER,
  status TEXT NOT NULL CHECK (status IN ('to-read', 'reading', 'completed'))
);
`;

//2.2
db.run(sql, (err) => {
  if (err) console.log(err);
  console.log("Table ready");
});

//3.1
app.get("/books", (req, res) => {
  const status = req.query.status; //3.3
  if (!status) {
    db.all("SELECT * FROM books", (err, rows) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.json(rows);
      }
    });
  } else {
    db.all("SELECT * FROM books WHERE status = ?", [status], (err, rows) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.json(rows);
      }
    });
  }
});

//3.2
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  db.all("SELECT * FROM books WHERE id = ?", [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.json(rows[0]);
    }
  });
});

//4.1
app.post("/books", (req, res) => {
  const { title, author, year, status } = req.body;
  if (!title || !author || !status) {
    res
      .status(400)
      .json({ message: "title, author and status must be provided" });
  } else if (!validateStatus(status)) {
    res.status(400).json({ message: "invalid status" });
  } else {
    db.run(
      `INSERT INTO books (title, author, year, status) VALUES (?, ?, ?, ?)`,
      [title, author, year, status],
      function (err) {
        if (err) {
          res.status(500).json({ message: err });
        } else {
          res.json({ id: this.lastID });
        }
      },
    );
  }
});

//4.2
app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  db.all("SELECT * FROM books WHERE id = ?", [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    } else {
      const { title, year, status } = req.body;

      if (status && !validateStatus(status)) {
        return res.status(400).json({ message: "invalid status" });
      }

      const updateSql =
        "UPDATE books SET title = COALESCE(?, title), year = COALESCE(?, year), status = COALESCE(?, status) WHERE id = ?";
      db.run(updateSql, [title, year, status, id], (err) => {
        if (err) {
          res.status(500).json({ message: "err" });
        } else {
          res.json({ message: `updated book ${id}` });
        }
      });
    }
  });
});

// 4.3
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;

  // Check if it exists
  db.all("SELECT * FROM books WHERE id = ?", [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
    } else {
      db.run("DELETE FROM books WHERE id = ?", [id], (err) => {
        if (err) res.status(500).json({ message: "error deleting" });
        else res.json({ message: "Book deleted successfully" });
      });
    }
  });
});

// 1.5
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
