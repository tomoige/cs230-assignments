const express = require("express");
const artistsController = require("../controllers/artistsController");

const router = express.Router();

router.get("/", artistsController.getAllArtists);
router.get("/:id", artistsController.getArtistById);
router.post("/", artistsController.createArtist);
router.put("/:id", artistsController.updateArtist);
router.delete("/:id", artistsController.deleteArtist);

module.exports = router;
