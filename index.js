const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const cors = require('cors');
const users = require("./routes/users");
require("./models/Index");
// const { User_Validation } = require("./utils/user_validation")
// console.log("sfsf");
// console.log(User_Validation);
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/users", users);




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));