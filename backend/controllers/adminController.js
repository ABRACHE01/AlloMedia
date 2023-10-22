
import { userController } from "./userController.js";
const UserController = new userController() ; 

export class adminController{

    static adminProfile = (req, res )=>{

        UserController.getMe(req ,res)

    }

    static logout = (req, res )=>{

        UserController.logout(req ,res)

    }

    static sendEmail = (req, res )=>{

        UserController.sendEmail(req ,res)

    }

    static resetPasswordAsLoggedIn = (req, res )=>{

        UserController.resetPasswordAsLoggedIn(req ,res)

    }



}