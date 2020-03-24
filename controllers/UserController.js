const User = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User_Validation } = require("../utils/user_validation")
class UserController {



    async register(req, res) {
        try {
            //console.log("before await");
            //console.log(req.body.password);
            const salt = await bcrypt.genSalt(10);
            console.log(User_Validation);
            let { error } = User_Validation.validateRegister(req.body);
            if (error) {
                let err_obj = User_Validation.getErrorObj(error);
                console.log({
                    code: 407,
                    errors: err_obj
                })
                return {
                    code: 406,
                    errors: err_obj
                };
            }
            //console.log(salt);
            const hashed_password = await bcrypt.hash(req.body.password, salt);
            let user = User.findOne({
                where: {
                    email: req.body.email
                }
            });
            //console.log((await user));
            user = await user;
            if (user) return {
                code: 405,
                message: "User already exists"
            }
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashed_password
            });
            if (!user)
                return {
                    code: 403,
                    message: "User is not created"
                }

            let token = user.generateToken();
            //console.log("after await");
            //res.header("access-token", token);
            user = user.toJSON();
            user["code"] = 200;
            user["access_token"] = token;
            //console.log(user);
            return user;
        } catch (ex) {
            console.log("failed", ex);
        }
    }

    async login(req, res) {
        let { error } = User_Validation.validateLogin(req.body);
        if (error) {
            let err_obj = User_Validation.getErrorObj(error);

            return {
                code: 407,
                errors: err_obj
            };
        }
        let credentials = _.pick(req.body, ["email", "password"]);
        let user_obj = await User.findOne({
            where: {
                email: credentials["email"]
            }
        });
        if (!user_obj) {
            return {
                code: 400,
                message: "No valid username"
            }
        }
        //console.log(login_response);
        let user = user_obj.get({
            plain: true
        });
        let inp_password = credentials["password"];
        //console.log(credentials);
        console.log(user);
        let isValidPassword = await bcrypt.compare(inp_password, user["password"]);
        console.log(isValidPassword);
        if (!isValidPassword) {
            return {
                code: 401,
                message: "Not valid password"
            }
        }
        user = _.pick(user, ["email"]);
        user["code"] = 200;
        user["access_token"] = user_obj.generateToken();
        return user;
    }
}

module.exports = UserController;