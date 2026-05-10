const express = require("express");
const songsController = require("../controllers/songsController");

const router = express.Router();

router.get("/", songsController.getAllSongs);
router.get("/:id", songsController.getSongById);
router.post("/", songsController.createSong);
router.put("/:id", songsController.updateSong);
router.delete("/:id", songsController.deleteSong);

module.exports = router;
