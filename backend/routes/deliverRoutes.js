import express from 'express';
const deliverRoutes = express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"
import { deliverController } from '../controllers/deliverController.js';


/**
 * @swagger
 * /api/user/deliver/me:
 *   get:
 *     summary: Get Deliverer Profile
 *     description: Retrieves the profile information of the authenticated deliverer user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Deliverer]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DelivererProfile'
 */
deliverRoutes.get('/deliver/me',authMiddleware.protect ,deliverController.deliverProfile)

/**
 * @swagger
 * /api/user/deliver/profileResetPass:
 *   post:
 *     summary: Send Reset Password Email
 *     description: Sends a reset password email to the authenticated deliverer user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Deliverer]
 *     responses:
 *       '200':
 *         description: Email sent successfully
 */
//send email after auth for rest
deliverRoutes.post("/deliver/profileResetPass", authMiddleware.protect, deliverController.sendEmail);

//reset password after auth 
/**
 * @swagger
 * /api/user/deliver/newPassloggedin/{token}:
 *   post:
 *     summary: Reset Password
 *     description: Resets the password for the authenticated deliverer user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Deliverer]
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
deliverRoutes.post("/deliver/newPassloggedin/:token",authMiddleware.protect, deliverController.resetPasswordAsLoggedIn);

export {deliverRoutes}