const db = require("../db");

exports.getAllAlbums = (req, res) => {
  db.all("SELECT * FROM albums ORDER BY album_id", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(200).json({ success: true, data: rows });
  });
};

exports.getAlbumById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM albums WHERE album_id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (!row) {
      return res.status(404).json({ success: false, message: "Album not found" });
    }
    return res.status(200).json({ success: true, data: row });
  });
};

exports.createAlbum = (req, res) => {
  const { album_id, album_name, release_year, number_of_listens, artist_id } = req.body;

  if (!album_id || !album_name || !release_year || number_of_listens === undefined || !artist_id) {
    return res.status(400).json({ success: false, message: "Missing required album fields" });
  }

  db.run(
    "INSERT INTO albums (album_id, album_name, release_year, number_of_listens, artist_id) VALUES (?, ?, ?, ?, ?)",
    [album_id, album_name, release_year, number_of_listens, artist_id],
    (insertErr) => {
      if (insertErr) {
        return res.status(500).json({ success: false, message: insertErr.message });
      }
      db.get("SELECT * FROM albums WHERE album_id = ?", [album_id], (selectErr, row) => {
        if (selectErr) {
          return res.status(500).json({ success: false, message: selectErr.message });
        }
        return res.status(201).json({ success: true, data: row });
      });
    }
  );
};

exports.updateAlbum = (req, res) => {
  const { id } = req.params;
  const { album_name, release_year, number_of_listens, artist_id } = req.body;

  db.get("SELECT * FROM albums WHERE album_id = ?", [id], (err, existing) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (!existing) {
      return res.status(404).json({ success: false, message: "Album not found" });
    }

    db.run(
      "UPDATE albums SET album_name = ?, release_year = ?, number_of_listens = ?, artist_id = ? WHERE album_id = ?",
      [
        album_name ?? existing.album_name,
        release_year ?? existing.release_year,
        number_of_listens ?? existing.number_of_listens,
        artist_id ?? existing.artist_id,
        id
      ],
      (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ success: false, message: updateErr.message });
        }
        db.get("SELECT * FROM albums WHERE album_id = ?", [id], (selectErr, row) => {
          if (selectErr) {
            return res.status(500).json({ success: false, message: selectErr.message });
          }
          return res.status(200).json({ success: true, data: row });
        });
      }
    );
  });
};

exports.deleteAlbum = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM albums WHERE album_id = ?", [id], function onDelete(err) {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: "Album not found" });
    }
    return res.status(200).json({ success: true, message: "Album deleted" });
  });
};
