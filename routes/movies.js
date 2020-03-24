const express = require('express');
const router = express.Router();
const MovieController = require("../controllers/MovieController");
const auth = require("../middleware/auth");
const controller = new MovieController();

router.get("/:id", async(req, res) => {
    console.log(req.params);
    let movies = await controller.moviesByGenre(req, res);
    res.send(movies);
});

router.put("/modify-watchList", async(req, res) => {
    const watch_response = await controller.modifyWatchList(req, res);
    res.send(watch_response);
});

module.exports = router;