import express from 'express';
const userRoutes = express.Router();
import {userController} from "../controllers/userController.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"

const UserController = new userController() ; 

userRoutes.post('/', UserController.registerUser)

userRoutes.post('/login', UserController.loginUser)

userRoutes.get('/me',authMiddleware.protect ,UserController.getMe)

userRoutes.get("/verify/:token", UserController.emailVerification );

//send email after auth for rest
userRoutes.post("/forget",UserController.forgotPassword );
//reset password befor auth 
userRoutes.post("/newPass/:token",UserController.resetPassword);

//send email after auth for rest
userRoutes.post("/profileResetPass", authMiddleware.protect, UserController.sendEmail);
//reset password after auth 
userRoutes.post("/newPassloggedin/:token",authMiddleware.protect, UserController.resetPasswordAsLoggedIn);

userRoutes.get("/logout", authMiddleware.protect, UserController.logout);



export {userRoutes}