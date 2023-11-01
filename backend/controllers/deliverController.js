
import { userController } from "./userController.js";
const UserController = new userController() ; 

export class deliverController{

    static deliverProfile = (req, res )=>{

        UserController.getMe(req ,res)

    }



    static sendEmail = (req, res )=>{

        UserController.sendEmail(req ,res)

    }

    static resetPasswordAsLoggedIn = (req, res )=>{

        UserController.resetPasswordAsLoggedIn(req ,res)

    }

}