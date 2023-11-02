import express from 'express';
const adminRoutes = express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"
import { adminController } from '../controllers/adminController.js';




/**
 * @swagger
 * api/user/admin/me:
 *   get:
 *     summary: Get Admin Profile
 *     description: Retrieves the profile information of the authenticated admin user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminProfile'
 */
adminRoutes.get('/admin/me',authMiddleware.protect ,adminController.adminProfile)

/**
 * @swagger
 * api/user/admin/profileResetPass:
 *   post:
 *     summary: Send Reset Password Email
 *     description: Sends a reset password email to the authenticated admin user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: Email sent successfully
 */
//send email after auth for rest
adminRoutes.post("/admin/profileResetPass", authMiddleware.protect, adminController.sendEmail);


/**
 * @swagger
 * api/user/admin/newPassloggedin/{token}:
 *   post:
 *     summary: Reset Password
 *     description: Resets the password for the authenticated admin user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Admin]
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
adminRoutes.post("/admin/newPassloggedin/:token",authMiddleware.protect, adminController.resetPasswordAsLoggedIn);


export {adminRoutes}