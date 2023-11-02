import express from 'express';
const clientRoutes = express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"
import { clientController } from '../controllers/clientController.js';


/**
 * @swagger
 * /api/user/client/me:
 *   get:
 *     summary: Get Client Profile
 *     description: Retrieves the profile information of the authenticated client user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Client]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientProfile'
 */
clientRoutes.get('/client/me',authMiddleware.protect ,clientController.clientProfile)


/**
 * @swagger
 * /api/user/client/profileResetPass:
 *   post:
 *     summary: Send Reset Password Email
 *     description: Sends a reset password email to the authenticated client user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Client]
 *     responses:
 *       '200':
 *         description: Email sent successfully
 */
//send email after auth for rest
clientRoutes.post("/client/profileResetPass", authMiddleware.protect, clientController.sendEmail);


/**
 * @swagger
 * /api/user/client/newPassloggedin/{token}:
 *   post:
 *     summary: Reset Password
 *     description: Resets the password for the authenticated client user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Reset password token received via email
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordPayload'
 *     responses:
 *       '200':
 *         description: Password reset successful
 *       '400':
 *         description: Invalid token
 */
//reset password after auth 
clientRoutes.post("/client/newPassloggedin/:token",authMiddleware.protect, clientController.resetPasswordAsLoggedIn);

export {clientRoutes}