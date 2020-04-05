const Sequelize = require("sequelize");
const sequelize = require("./Index");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const Model = Sequelize.Model;
class User extends Model {
    generateToken() {
        var i = 'Mysoft corp'; // Issuer 
        var s = 'some@user.com'; // Subject 
        var a = 'http://mysoftcorp.in'; // Audience
        // SIGNING OPTIONS
        let signOptions = {
            issuer: i,
            subject: s,
            audience: a,
            expiresIn: "12h",
            algorithm: "RS256"
        };

        let privateKEY = fs.readFileSync('./private.key', 'utf8');

        let token = jwt.sign({ name: this.name, isAdmin: this.isAdmin }, privateKEY);
        return token;
    }
}
User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now
    },
}, {
    timestamps: false,
    sequelize,
    modelName: 'users'
        // options
});

module.exports = User;