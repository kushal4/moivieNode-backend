const Joi = require('@hapi/joi');


class User_Validation {

    static validateLogin(user) {

        const loginValidation = Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .regex(/[a-zA-Z0-9]{3,30}/)
                .required(),
        })

        return loginValidation.validate(user, { abortEarly: false });
    }

    static validateRegister(user) {
        console.log("valtiosds");
        const registerValidation = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        })

        return registerValidation.validate(user, { abortEarly: false });
    }


    static getErrorObj(error) {
        let err_obj = {};
        for (let err_idx in error.details) {
            let err_dtl = error.details[err_idx];
            err_obj[err_dtl["path"]] = err_dtl["message"];
        }
        return err_obj;
    }
}


module.exports.User_Validation = User_Validation;