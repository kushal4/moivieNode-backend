const Movie = require("../models/movie");
const MovieDetails = require("../models/moviedetails");
const _ = require("lodash");
class MovieController {

    async moviesByGenre(req, res) {
        let genreId = req.params.id;
        let movies = null;
        let findOption = {
            include: MovieDetails
        }
        if (genreId != -1) {
            //console.log("valid genre");
            findOption["where"] = {
                "genre_id": genreId
            }
        }
        try {
            let movies_obj = await this.fetchMoviesByGenreId(genreId, findOption)
            movies = {
                    code: 200,
                    counts: movies_obj.length,
                    results: movies_obj
                }
                // console.log(movies_obj);
                //console.log(JSON.stringify(movies, null, 2));

            return movies;
        } catch (ex) {
            return {
                code: 500,
                message: "Somthing went wrong while fetching movies by genreID"
            }
        }

    }

    async fetchMoviesByGenreId(genreId, findOption) {
        let movies = await Movie.findAll(findOption);
        let movies_arr = JSON.parse(JSON.stringify(movies));
        console.log(Array.isArray(movies_arr));
        let movies_obj = movies_arr.map(movie => {
            //console.log(movie);
            let movie_detail = movie["movie_detail"];
            //console.log(movie_detail);
            for (let movie_prop in movie_detail) {
                //console.log(movie_prop);
                if (movie_prop != "movie_id") {
                    if (movie_prop == "genre_ids") {
                        //console.log(movie_detail[movie_prop].replace(/\s/g, ""));
                        let genreIdsArr = (movie_detail[movie_prop]).replace(/\s/g, "").split(",").map(genreStr => parseInt(genreStr));
                        movie[movie_prop] = genreIdsArr;
                    } else {
                        movie[movie_prop] = movie_detail[movie_prop];
                    }

                }
            }
            delete movie["movie_detail"];
            // console.log(movie);
            return movie;
        });

        return movies_obj;
    }


    async modifyWatchList(req, res) {
        let watchListParams = _.pick(req.body, ["movie_id", "watch_state"]);
        let list_response = await Movie.update({
            "watch_state": watchListParams["watch_state"]
        }, {
            where: {
                "id": watchListParams["movie_id"]
            }
        });
        //console.log(list_response);
        if (Array.isArray(list_response) && list_response.length > 0) {
            return {
                code: 200,
                message: "watchList changed successfully",
                watch_state: watchListParams["watch_state"]
            }
        } else {
            res.status(500);
            return {
                code: 400,
                message: "watchlist couldn't be updated something went wrong"
            }
        }
    }
}

module.exports = MovieController;