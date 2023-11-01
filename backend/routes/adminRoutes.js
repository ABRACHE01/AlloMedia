import express from 'express';
const adminRoutes = express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"
import { adminController } from '../controllers/adminController.js';




adminRoutes.get('/admin/me',authMiddleware.protect ,adminController.adminProfile)

//send email after auth for rest
adminRoutes.post("/admin/profileResetPass", authMiddleware.protect, adminController.sendEmail);

//reset password after auth 
adminRoutes.post("/admin/newPassloggedin/:token",authMiddleware.protect, adminController.resetPasswordAsLoggedIn);


export {adminRoutes}