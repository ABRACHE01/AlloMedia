
import { userController } from "./userController.js";
const UserController = new userController() ; 

export class deliverController{

    static deliverProfile = (req, res )=>{

        UserController.getMe(req ,res)

    }

    static logout = (req, res )=>{

        UserController.logout(req ,res)

    }

}