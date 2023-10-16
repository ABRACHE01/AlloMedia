import express from 'express';
const userRoutes = express.Router();
import {userController} from "../controllers/userController.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"

const UserController = new userController() ; 
//register
userRoutes.post('/', UserController.registerUser)
//login 
userRoutes.post('/login', UserController.loginUser)

userRoutes.get('/me',authMiddleware.protect ,UserController.getMe)


export {userRoutes}