import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from 'express-async-handler';
import { jwtToken } from '../utils/jwtToken.js';
import { Role } from "../models/roleModel.js";
import {userValidation} from "../validation/UserValidation.js"
import { sendEmail } from "../utils/email.js";
import jwt from "jsonwebtoken";



export  class userController {
    

    registerUser = asyncHandler(async (req, res) => {
        let registerValidation = userValidation.registerValidate(req);
      
        if (registerValidation.error) {
          return res
            .status(400)
            .json({ error: registerValidation.error.details.map((error) => error.message) });
        }
      
        // if (!req.file) {
        //   return res
        //     .status(400)
        //     .json({ error: 'Please add all required fields, including an image' });
        // }
      
        const { name, email, role, password } = req.body;
      
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ error: 'This user already exists' });
        }
      
        const roleExists = await Role.findOne({ name: role });
        if (!roleExists) {
          return res.status(400).json({ error: 'Invalid role' });
        }
      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
      
        const imagePath =  req.file ? req.file.path : null ;
      
        const user = await User.create({
          name,
          email,
          role: roleExists._id,
          password: hashedPassword,
          profileImage: imagePath,
        });
      
        if (user) {
          const userPayload = {
            id: user.id,
          };
          const verificationToken = jwtToken.generateToken(userPayload, '10m');
          const verificationLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;
          await sendEmail(user.email, 'Verify Email', verificationLink);
          return res.status(200).json({ message: 'You are registered. Please check your email.' });
        } else {
          return res.status(400).json({ error: 'Invalid user data' });
        }
      });

    loginUser = asyncHandler(async(req, res)=>{
        
        let loginValidation = userValidation.loginValidate(req)

        if (loginValidation.error) {
            return res.status(400).json({ error: 'Invalide user credentails' });
        }

        const {email , password} = req.body;
        
        const user = await User.findOne({ email }).populate('role');
        

        if(user && (await bcrypt.compare(password , user.password)))
        {
            const userPayload = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
              };
                          
        
        if(user.isEmailVerified){
            
            const loginToken = jwtToken.generateToken( userPayload , '48h');
            res.cookie('al_ui', loginToken, {  secure: true });
            res.status(200).json({
                message : "logged in sucsessfully"
            });

        }else{
            const verificationToken = jwtToken.generateToken(userPayload , '10m')
            const verificationLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;           
            await sendEmail(user.email, "Verify Email", verificationLink);
            res.status(200).json({ message : "please check your email"})
        }

        }else{
            res.status(401).json({error:'Invalide credentails'})
        }
    }) 

    getMe = asyncHandler( (req , res )=>{

        const { _id , name , email , role } =  req.user
        res.status(200).json({
            id:_id,
            name,
            email,
            role:role.name,
        })

    })

    emailVerification = asyncHandler(async (req, res) => {

        const token = req.params.token;

        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
          const  id  = decoded.userPayload.id;
          const user = await User.findOne({ _id: id });

          if (!user) {
            return res.status(400).send("Invalid user");
          }
        
          if (user.verified) {
            return res.status(400).send("Email is already verified");
          }
        
          await User.updateOne({ _id: id }, { isEmailVerified: true });
        
          res.send("Email verified successfully"); 

        } catch (err) {

          if (err.name === "TokenExpiredError") {
            return res.status(400).send("Your token has expired");
          }
                
          return res.status(400).send("Invalid token");
        }
    });
    
    //forger password 
    forgotPassword = asyncHandler(async(req , res )=>{

        const { email } = req.body

        if (!email){
            res.status(400).json({error:'Please email fieled'})
        }

        const user = await User.findOne({email});
        if(!user){
          res.status(400).json({error:'no user with this email found'})
        }

        const verificationToken = jwtToken.generateToken(user._id , '10m') 
        const verificationLink = `http://localhost:5173/setpassword?token=${verificationToken}`;
        await sendEmail(user.email, "Forgot Password", verificationLink);
        res.status(200).json({ message : "please check your email "})

    });
    
    resetPassword = asyncHandler(async(req,res)=>{

     
        const token = req.params.token ;
        const {newPassword} = req.body;

        let resetPasswordValidation = userValidation.resetPassValidation(req)
        if (resetPasswordValidation.error) {
            return res.status(400).json({ error: resetPasswordValidation.error.details.map(error=> error.message ) });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
          
            const userId = decoded.userPayload;
          
            const user = await User.findOne({ _id: userId });
          
            if (!user) {
              return res.status(400).json({error:"Invalid user"});
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword,salt);
            
            await User.updateOne({ _id: userId }, { password: hashedPassword });
          
            res.status(200).json({message :"password resseted successfully "});
  
          } catch (err) {
  
            if (err.name === "TokenExpiredError") {
              return res.status(400).json({error :"Your token has expired"});
            }
                  
            return res.status(400).json({error :"Invalid token"});
          }

    });

    //reset password
    sendEmail=  asyncHandler(async(req,res)=>{
        
        const { email }=req.user;

        console.log(req.user)
        
        if (!email){
            res.status(400).json({error:'Please add all fields'})
        }

        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({error:'no user with this email found'})
        }

        const verificationToken = jwtToken.generateToken(user._id , '10m')
        const verificationLink = `http://localhost:5173/resetpassword?token=${verificationToken}`;
        await sendEmail(user.email, "Forgot Password", verificationLink);
        res.status(200).json({ message : "email verification sent , please check your email "})

    });

    resetPasswordAsLoggedIn = asyncHandler(async(req,res)=>{


        const {newPassword , oldPassword } = req.body;

        let resetPasswordValidation = userValidation.resetPassValidation(req)
        if (resetPasswordValidation.error) {
            return res.status(400).json({ error: resetPasswordValidation.error.details.map(error=> error.message ) });
        }

        const user = await User.findById(req.user.id);
        

        if ( !oldPassword ){
            res.status(400)
             .json({ error : 'Please add old password in order to change password '})
        }

        if( user && (await bcrypt.compare( oldPassword , user.password))){

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword,salt);
            
            await User.updateOne({ _id: req.user.id }, { password: hashedPassword });
          
            res.status(200).json({message:"Password reseted successfully"});
            
        }else{
            res.status(400).json({error:'invalid credantele'})
        }
        

    });

    logout = (req, res) => {
        res.clearCookie('al_ui').status(200).json({messsage:'Logged out successfully'});
      }


}