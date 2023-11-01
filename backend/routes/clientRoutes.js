import express from 'express';
const clientRoutes = express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"
import { clientController } from '../controllers/clientController.js';

clientRoutes.get('/client/me',authMiddleware.protect ,clientController.clientProfile)


//send email after auth for rest
clientRoutes.post("/client/profileResetPass", authMiddleware.protect, clientController.sendEmail);

//reset password after auth 
clientRoutes.post("/client/newPassloggedin/:token",authMiddleware.protect, clientController.resetPasswordAsLoggedIn);

export {clientRoutes}