import express from 'express';
const deliverRoutes = express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"
import { deliverController } from '../controllers/deliverController.js';



deliverRoutes.get('/deliver/me',authMiddleware.protect ,deliverController.deliverProfile)


export {deliverRoutes}