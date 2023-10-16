import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from 'express-async-handler';
import { jwtToken } from '../utils/jwtToken.js';



export class userController {


    // @desc     Register new user 
    // @route    POST /api/users
    // @access   Public 
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
                token: jwtToken.generateToken(user._id)

            })
        }else{
            res.status(400)
            throw new Error('Invalide user data ')
        }
            
    })


    // @desc     Register new user 
    // @route    POST /api/users
    // @access   Public 
    loginUser = asyncHandler(async(req, res)=>{

        const {email , password} = req.body;

        const user = await User.findOne({email})

        if(user && (await bcrypt.compare(password , user.password)))
        {
            res.status(201).json({
                _id : user.id ,
                name : user.name ,
                role: user.role,
                token : jwtToken.generateToken(user._id)
            });
        }else{
            res.status(401)
            throw Error('Invalide credentails')
        }
    }) 



}