import express from 'express';
const userRoutes = express.Router();
import {userController} from "../controllers/userController.js"
import upload from "../utils/handelimages.js"


const UserController = new userController() ; 

userRoutes.post('/',upload.single('profileImage'), UserController.registerUser)

userRoutes.post('/login', UserController.loginUser)

userRoutes.get("/verify/:token", UserController.emailVerification );

//send email after auth for rest
userRoutes.post("/forget",UserController.forgotPassword );
//reset password befor auth 
userRoutes.post("/newPass/:token",UserController.resetPassword);



export {userRoutes}