import express from 'express';
const userRoutes = express.Router();
import {userController} from "../controllers/userController.js"

const UserController = new userController() ; 

userRoutes.post('/', UserController.registerUser)


export {userRoutes}