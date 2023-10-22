
import Joi from "joi";


export class userValidation{

    static registerValidate(req, res) {

        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),

            email: Joi.string()
            .regex(/^\S+@\S+\.\S+$/)
            .email({ tlds: { allow: false } }) 
            .min(5) 
            .max(254) 
            .required(),

            password: Joi.string()
            .min(8) 
            .max(64) 
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) // Requires at least one uppercase, one lowercase, one digit, and one special character
            .invalid('password', '12345678') 
            .required(),

            repeat_password: Joi.ref('password'),

            role: Joi.string() 
            .valid('Client', 'Deliver', 'Admin')
            .required(),


        }).options({ allowUnknown: true });

        const validationResult = schema.validate(req.body , {abortEarly: false})
        return validationResult;

    }
    static loginValidate(req, res) {

        const schema = Joi.object({
           

            email: Joi.string()
            .regex(/^\S+@\S+\.\S+$/)
            .email({ tlds: { allow: false } }) 
            .min(5) 
            .max(254) 
            .required(),

            password: Joi.string()
            .min(8) 
            .max(64) 
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) // Requires at least one uppercase, one lowercase, one digit, and one special character
            .invalid('password', '12345678') 
            .required(),


        })

        const validationResult = schema.validate(req.body , {abortEarly: false})
        return validationResult;

    }
    static resetPassValidation(req, res) {

        const schema = Joi.object({
           
            
            newPassword: Joi.string()
            .min(8) 
            .max(64) 
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) // Requires at least one uppercase, one lowercase, one digit, and one special character
            .invalid('password', '12345678') 
            .required(),
            repeat_newPassword: Joi.ref('newPassword'),

        }).options({ allowUnknown: true });

        const validationResult = schema.validate(req.body , {abortEarly: false})
        return validationResult;

    }
    
}


