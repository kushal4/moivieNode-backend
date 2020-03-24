const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");

let controller = new UserController();






router.post("/register", async(req, res) => {
    //console.log("came to register route");


    const user = await controller.register(req, res);
    // if (user["code"] != 200) {
    //     res.status(400);
    // }
    // console.log(user_response.toJSON());
    //return JSON.stringify();
    res.send(user);
});

router.post("/login", async(req, res) => {

    console.log("came to login route");
    const user = await controller.login(req, res);
    if (user["code"] != 200) {
        res.status(400);
    }
    //return JSON.stringify();
    res.send(user);
});


module.exports = router;