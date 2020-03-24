const users = require("../routes/users");
const genres = require("../routes/genres");
const movies = require("../routes/movies");
module.exports = function(app) {
    app.use("/api/users", users);
    app.use("/api/genres", genres);
    app.use("/api/movies", movies);
}