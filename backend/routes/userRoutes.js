import express from 'express';
const userRoutes = express.Router();
import {userController} from "../controllers/userController.js"

const UserController = new userController() ; 
//register
userRoutes.post('/', UserController.registerUser)

//login 
userRoutes.post('/login', UserController.loginUser)


export {userRoutes}