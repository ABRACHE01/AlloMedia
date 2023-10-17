import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from 'express-async-handler';
import { jwtToken } from '../utils/jwtToken.js';
import {sendEmail} from "../utils/email.js";

import jwt from "jsonwebtoken";




export class userController {


    registerUser = asyncHandler(async (req , res )=>{
        const { name , email ,role , password } = req. body;

        if (!name || !email || !password || !role ){
            res.status(400)
            throw new Error('Please add all fieleds')
        }
        //check if the user exist 

        const userExists = await User.findOne({email})
        if(userExists){
            res.status(400)
            throw new Error('this user already exists')
        }

        //hash the password 

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        //create user 

        const user = await User.create({
            name ,
            email ,
            role,
            password : hashedPassword,

        })

        if(user){
            res.status(201).json({
                _id: user.id ,
                name : user.name,
                email: user.email ,
                role: user.role,
                token: jwtToken.generateToken(user._id , '30d')

            })
        }else{
            res.status(400)
            throw new Error('Invalide user data ')
        }
            
    })

    loginUser = asyncHandler(async(req, res)=>{

        const {email , password} = req.body;

        const user = await User.findOne({email})

        if(user && (await bcrypt.compare(password , user.password)))
        {
            const verificationToken = jwtToken.generateToken(user._id , '10m')
            
            const verificationLink = `${process.env.BASE_URL}/api/users/verify/${verificationToken}`;
            await sendEmail(user.email, "Verify Email", verificationLink);

        if(user.isEmailVerified){
            res.status(201).json({
                _id : user.id ,
                name : user.name ,
                role: user.role,
                token : verificationToken,
                isEmailVerified:user.isEmailVerified,
            });
        }else{res.json({ message : "please check your email "})}

        }else{
            res.status(401)
            throw Error('Invalide credentails')
        }
    }) 

    getMe = asyncHandler(async(req , res )=>{

        const { _id , name , email , role } = await User.findById(req.user.id)

        res.status(200).json({
            id:_id,
            name,
            email,
            role,
        })

    })

    emailVerification = asyncHandler(async (req, res) => {

        const token = req.params.token;

        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
          const userId = decoded.id;
        
          const user = await User.findOne({ _id: userId });
        
          if (!user) {
            return res.status(400).send("Invalid user");
          }
        
          if (user.verified) {
            return res.status(400).send("Email is already verified");
          }
        
          await User.updateOne({ _id: userId }, { isEmailVerified: true });
        
          res.send("Email verified successfully");

        } catch (err) {

          if (err.name === "TokenExpiredError") {
            return res.status(400).send("Your token has expired");
          }
                
          return res.status(400).send("Invalid token");
        }
    });
      

}