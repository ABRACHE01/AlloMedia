import express from 'express';
const clientRoutes = express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"
import { clientController } from '../controllers/clientController.js';

clientRoutes.get('/client/me',authMiddleware.protect ,clientController.clientProfile)

clientRoutes.get('/client/logout',authMiddleware.protect ,clientController.logout)


export {clientRoutes}