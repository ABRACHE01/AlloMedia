import express from 'express';
const deliverRoutes = express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"
import { deliverController } from '../controllers/deliverController.js';



deliverRoutes.get('/deliver/me',authMiddleware.protect ,deliverController.deliverProfile)

deliverRoutes.get('/deliver/logout',authMiddleware.protect ,deliverController.logout)

export {deliverRoutes}