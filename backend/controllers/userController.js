import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from 'express-async-handler';
import { jwtToken } from '../utils/jwtToken.js';
import {sendEmail} from "../utils/email.js";
import { Role } from "../models/roleModel.js";

import jwt from "jsonwebtoken";




export class userController {


    registerUser = asyncHandler(async (req , res )=>{

        const { name , email ,role , password  } = req.body;

        if (!name || !email || !password || !role || !req.file ){
            
            res.status(400);
            throw new Error('Please add all required fields, including an image');
        }

        const userExists = await User.findOne({email})
        if(userExists){
            res.status(400)
            throw new Error('this user already exists')
        }

        const roleExists = await Role.findOne({ name: role });
        if (!roleExists) {
            res.status(400);
            throw new Error('Invalid role');
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const imagePath = req.file.path;

        const user = await User.create({
            name ,
            email ,
            role: roleExists._id,
            password : hashedPassword,
            profileImage:imagePath,

        })

        if(user){
            const userPayload = {
                id: user.id,
              };
            const verificationToken = jwtToken.generateToken(userPayload , '10m')
            const verificationLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;
            await sendEmail(user.email, "Verify Email", verificationLink);
            res.json({ message : " you are registred please check your email "})
        }else{
            res.status(400)
            throw new Error('Invalide user data ')
        }
            
    })

    loginUser = asyncHandler(async(req, res)=>{

        const {email , password} = req.body;

        const user = await User.findOne({ email }).populate('role');
        

        if(user && (await bcrypt.compare(password , user.password)))
        {
            const userPayload = {
                id: user.id,
                name: user.name,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
              };
                          
        
        if(user.isEmailVerified){
            
            const loginToken = jwtToken.generateToken( userPayload , '48h');
            res.cookie('token', loginToken, { httpOnly: true, secure: true });
            res.status(201).json({
                message: `hello ${ user.name }, you are logged in as a ${user.role.name}`,
            });

        }else{
            const verificationToken = jwtToken.generateToken(userPayload , '10m')
            const verificationLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;            await sendEmail(user.email, "Verify Email", verificationLink);
            res.json({ message : "please check your email "})
        }

        }else{
            res.status(401)
            throw Error('Invalide credentails')
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
            res.status(400)
            throw new Error('Please add all fields')
        }

        const user = await User.findOne({email});
        if(!user){
            res.status(400)
            throw new Error('no user with this email found')
        }

        const verificationToken = jwtToken.generateToken(user._id , '10m') 
        const verificationLink = `${process.env.BASE_URL}/api/auth/newPass/${verificationToken}`;
        await sendEmail(user.email, "Forgot Password", verificationLink);
        res.json({ message : "please check your email "})


    });
      
    resetPassword = asyncHandler(async(req,res)=>{

        const token = req.params.token ;
        const {newPassword} = req.body;

        if ( !newPassword ){
            res.status(400)
            throw new Error('Please add all fieleds')
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
          
            const userId = decoded.userPayload;
          
            const user = await User.findOne({ _id: userId });
          
            if (!user) {
              return res.status(400).send("Invalid user");
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword,salt);
            
            await User.updateOne({ _id: userId }, { password: hashedPassword });
          
            res.send("Password reseted successfully");
  
          } catch (err) {
  
            if (err.name === "TokenExpiredError") {
              return res.status(400).send("Your token has expired");
            }
                  
            return res.status(400).send("Invalid token");
          }

    });


    //reset password
    sendEmail=  asyncHandler(async(req,res)=>{
        
        const { email }=req.user;

        if (!email){
            res.status(400)
            throw new Error('Please add all fields')
        }

        const user = await User.findOne({email});
        if(!user){
            res.status(400)
            throw new Error('no user with this email found')
        }

        const verificationToken = jwtToken.generateToken(user._id , '10m')
        const verificationLink = `${process.env.BASE_URL}/api/auth/newPassloggedin/${verificationToken}`;
        await sendEmail(user.email, "Forgot Password", verificationLink);
        res.json({ message : "please check your email "})

    });
    resetPasswordAsLoggedIn = asyncHandler(async(req,res)=>{


        const {newPassword , oldPassword } = req.body;


        const user = await User.findById(req.user.id);
        

        if ( !newPassword  || !oldPassword ){
            res.status(400)
            throw new Error('Please add all fieleds')
        }

        if( user && (await bcrypt.compare( oldPassword , user.password))){

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword,salt);
            
            await User.updateOne({ _id: req.user.id }, { password: hashedPassword });
          
            res.send("Password reseted successfully");
            
        }else{
            res.status(400)
            throw new Error('invalid credantele')
        }
        

    });

    logout = (req, res) => {
        res.clearCookie('token').send('Logged out successfully');
      }


}