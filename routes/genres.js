const express = require('express');
const router = express.Router();
const GenreController = require("../controllers/GenreController");
const auth = require("../middleware/auth");

const controller = new GenreController();
router.get("/", auth, async(req, res) => {
    //console.log("genres getting");
    const genres = await controller.genres();
    console.log(genres);
    res.send(genres);
})

module.exports = router;