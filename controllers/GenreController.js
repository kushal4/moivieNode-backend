const Genre = require("../models/genre");
class GenreController {

    async genres() {
        const genres = await Genre.findAll({ raw: true })
            // console.log(genres);
        let genres_obj = {
            code: 200,
            genres: genres
        }
        console.log(genres_obj);
        return genres_obj;
    }
}


module.exports = GenreController;