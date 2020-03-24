const Sequelize = require("sequelize");
const sequelize = require("./Index");
const MovieDetails = require("./moviedetails");
const Model = Sequelize.Model;
class Movie extends Model {}

Movie.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    genre_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    original_title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    release_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    original_language: {
        type: Sequelize.STRING,
        allowNull: false
    },
    watch_state: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['watched', 'not_watched', 'watch_later']
    }
}, {
    underscore: true,
    timestamps: false,
    sequelize,
    modelName: 'movies'
        // options
});

Movie.hasOne(MovieDetails, {
    foreignKey: "movie_id"
});

module.exports = Movie;