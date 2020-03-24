const Sequelize = require("sequelize");
const sequelize = require("./Index");

const Model = Sequelize.Model;
class MovieDetails extends Model {}

MovieDetails.init({
    movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rating: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    overview: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    genre_ids: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'movie_details'
        // options
});

module.exports = MovieDetails;