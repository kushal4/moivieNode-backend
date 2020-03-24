const Sequelize = require("sequelize");
const sequelize = require("./Index");

const Model = Sequelize.Model;
class Genre extends Model {}

Genre.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'genres'
        // options
});

module.exports = Genre;