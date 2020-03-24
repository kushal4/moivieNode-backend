const Sequelize = require("sequelize");
const sequelize = require("./Index");

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
    title: {
        type: Sequelize.STRING,
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
        allowNull: false
    }
}, {
    underscore: true,
    timestamps: false,
    sequelize,
    modelName: 'movies'
        // options
});

module.exports = Movie;