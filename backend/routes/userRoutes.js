import express from 'express';
const userRoutes = express.Router();
import {userController} from "../controllers/userController.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"

const UserController = new userController() ; 

userRoutes.post('/', UserController.registerUser)

userRoutes.post('/login', UserController.loginUser)

userRoutes.get('/me',authMiddleware.protect ,UserController.getMe)


userRoutes.get("/verify/:token", UserController.emailVerification );


export {userRoutes}