import express from 'express';
const adminRoutes = express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"
import { adminController } from '../controllers/adminController.js';




adminRoutes.get('/admin/me',authMiddleware.protect ,adminController.adminProfile)
adminRoutes.get('/admin/logout',authMiddleware.protect ,adminController.logout)



export {adminRoutes}