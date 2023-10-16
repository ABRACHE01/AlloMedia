import express from 'express';
const userRoutes = express.Router();
import {userController} from "../controllers/userController.js"

const UserController = new userController() ; 

userRoutes.post('/', UserController.registerUser)
userRoutes.post('/login', UserController.loginUser)


export {userRoutes}