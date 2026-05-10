const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "app.db");
const modelPath = path.join(__dirname, "model.sql");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("DB connection error:", err.message);
  } else {
    console.log("Connected to DB.");
  }
});

const modelSql = fs.readFileSync(modelPath, "utf8");

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON");
  db.exec(modelSql, (err) => {
    if (err) {
      console.error("DB setup error:", err.message);
    } else {
      console.log("DB ready.");
    }
  });
});

module.exports = db;
