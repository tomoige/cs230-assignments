const db = require("../db");

exports.getAllArtists = (req, res) => {
  db.all("SELECT * FROM artists ORDER BY artist_id", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(200).json({ success: true, data: rows });
  });
};

exports.getArtistById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM artists WHERE artist_id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (!row) {
      return res.status(404).json({ success: false, message: "Artist not found" });
    }
    return res.status(200).json({ success: true, data: row });
  });
};

exports.createArtist = (req, res) => {
  const { artist_id, artist_name, genre, monthly_listeners } = req.body;

  if (!artist_id || !artist_name || !genre || monthly_listeners === undefined) {
    return res.status(400).json({ success: false, message: "Missing required artist fields" });
  }

  db.run(
    "INSERT INTO artists (artist_id, artist_name, genre, monthly_listeners) VALUES (?, ?, ?, ?)",
    [artist_id, artist_name, genre, monthly_listeners],
    (insertErr) => {
      if (insertErr) {
        return res.status(500).json({ success: false, message: insertErr.message });
      }

      db.get("SELECT * FROM artists WHERE artist_id = ?", [artist_id], (selectErr, row) => {
        if (selectErr) {
          return res.status(500).json({ success: false, message: selectErr.message });
        }
        return res.status(201).json({ success: true, data: row });
      });
    }
  );
};

exports.updateArtist = (req, res) => {
  const { id } = req.params;
  const { artist_name, genre, monthly_listeners } = req.body;

  db.get("SELECT * FROM artists WHERE artist_id = ?", [id], (err, existing) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (!existing) {
      return res.status(404).json({ success: false, message: "Artist not found" });
    }

    db.run(
      "UPDATE artists SET artist_name = ?, genre = ?, monthly_listeners = ? WHERE artist_id = ?",
      [
        artist_name ?? existing.artist_name,
        genre ?? existing.genre,
        monthly_listeners ?? existing.monthly_listeners,
        id
      ],
      (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ success: false, message: updateErr.message });
        }
        db.get("SELECT * FROM artists WHERE artist_id = ?", [id], (selectErr, row) => {
          if (selectErr) {
            return res.status(500).json({ success: false, message: selectErr.message });
          }
          return res.status(200).json({ success: true, data: row });
        });
      }
    );
  });
};

exports.deleteArtist = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM artists WHERE artist_id = ?", [id], function onDelete(err) {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: "Artist not found" });
    }
    return res.status(200).json({ success: true, message: "Artist deleted" });
  });
};
