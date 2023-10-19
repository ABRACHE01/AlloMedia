
import { userController } from "./userController.js";
const UserController = new userController() ; 

export class adminController{

    static adminProfile = (req, res )=>{

        UserController.getMe(req ,res)

    }

    static logout = (req, res )=>{

        UserController.logout(req ,res)

    }

}