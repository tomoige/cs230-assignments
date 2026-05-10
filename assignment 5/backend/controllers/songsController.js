const db = require("../db");

exports.getAllSongs = (req, res) => {
  db.all("SELECT * FROM songs ORDER BY song_id", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(200).json({ success: true, data: rows });
  });
};

exports.getSongById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM songs WHERE song_id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (!row) {
      return res.status(404).json({ success: false, message: "Song not found" });
    }
    return res.status(200).json({ success: true, data: row });
  });
};

exports.createSong = (req, res) => {
  const { song_id, song_name, release_year, album_id } = req.body;

  if (!song_id || !song_name || !release_year || !album_id) {
    return res.status(400).json({ success: false, message: "Missing required song fields" });
  }

  db.run(
    "INSERT INTO songs (song_id, song_name, release_year, album_id) VALUES (?, ?, ?, ?)",
    [song_id, song_name, release_year, album_id],
    (insertErr) => {
      if (insertErr) {
        return res.status(500).json({ success: false, message: insertErr.message });
      }
      db.get("SELECT * FROM songs WHERE song_id = ?", [song_id], (selectErr, row) => {
        if (selectErr) {
          return res.status(500).json({ success: false, message: selectErr.message });
        }
        return res.status(201).json({ success: true, data: row });
      });
    }
  );
};

exports.updateSong = (req, res) => {
  const { id } = req.params;
  const { song_name, release_year, album_id } = req.body;

  db.get("SELECT * FROM songs WHERE song_id = ?", [id], (err, existing) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (!existing) {
      return res.status(404).json({ success: false, message: "Song not found" });
    }

    db.run(
      "UPDATE songs SET song_name = ?, release_year = ?, album_id = ? WHERE song_id = ?",
      [song_name ?? existing.song_name, release_year ?? existing.release_year, album_id ?? existing.album_id, id],
      (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ success: false, message: updateErr.message });
        }
        db.get("SELECT * FROM songs WHERE song_id = ?", [id], (selectErr, row) => {
          if (selectErr) {
            return res.status(500).json({ success: false, message: selectErr.message });
          }
          return res.status(200).json({ success: true, data: row });
        });
      }
    );
  });
};

exports.deleteSong = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM songs WHERE song_id = ?", [id], function onDelete(err) {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: "Song not found" });
    }
    return res.status(200).json({ success: true, message: "Song deleted" });
  });
};
