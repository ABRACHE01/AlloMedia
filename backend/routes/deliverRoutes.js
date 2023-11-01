import express from 'express';
const deliverRoutes = express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"
import { deliverController } from '../controllers/deliverController.js';



deliverRoutes.get('/deliver/me',authMiddleware.protect ,deliverController.deliverProfile)


//send email after auth for rest
deliverRoutes.post("/deliver/profileResetPass", authMiddleware.protect, deliverController.sendEmail);

//reset password after auth 
deliverRoutes.post("/deliver/newPassloggedin/:token",authMiddleware.protect, deliverController.resetPasswordAsLoggedIn);

export {deliverRoutes}