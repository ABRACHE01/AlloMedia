import express from 'express';
const userRoutes = express.Router();
import {userController} from "../controllers/userController.js"
import upload from "../utils/handelimages.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"


const UserController = new userController() ; 

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/** register new user 
 * @swagger
 * /api/auth/:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *               role:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Bad request, validation error, or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Error 1", "Error 2"]
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */
userRoutes.post('/',upload.single('profileImage'), UserController.registerUser)

/** user login
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged in successfully
 *       400:
 *         description: Bad request, validation error, or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid user credentials
 *       401:
 *         description: Unauthorized, invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid credentials
 */
userRoutes.post('/login', UserController.loginUser)

 /** email verification
 * @swagger
 * /api/auth/verify/{token}:
 *   get:
 *     summary: Verify user's email
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Verification token received via email
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Email verified successfully
 *       400:
 *         description: Invalid token or email is already verified
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid token or email is already verified
 *       401:
 *         description: Token has expired
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Your token has expired
 */
userRoutes.get("/verify/:token", UserController.emailVerification );

/** send email after auth for rest
 * @swagger
 * /api/auth/forget:
 *   post:
 *     summary: Send reset password email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please check your email
 *       400:
 *         description: Bad request, missing email field or no user found with the given email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Please provide a valid email
 */
userRoutes.post("/forget",UserController.forgotPassword );

/**reset password befor auth 
 * @swagger
 * /api/auth/newPass/{token}:
 *   post:
 *     summary: Reset user's password
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Reset password token received via email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *             required:
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successfully
 *       400:
 *         description: Invalid token or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid token or user not found
 *       401:
 *         description: Token has expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Your token has expired
 */
userRoutes.post("/newPass/:token",UserController.resetPassword);

/** user logout
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 */
userRoutes.get('/logout',UserController.logout)



export {userRoutes}