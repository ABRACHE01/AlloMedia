
import  jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import {User} from '../models/userModel.js'


export class authMiddleware{

    static protect = asyncHandler(async(req ,res , next )=>{

        let token 

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try{
                token = req.headers.authorization.split(' ')[1]

                //verify the token 
                const decoded = jwt.verify(token , process.env.JWT_SECRET)

                //GET USER FROM THE TOKEN 

                req.user = await User.findById(decoded.id).select('-password')

                next()
            }catch(error){
                console.log(error)
                res.status(401)
                throw new Error('not authorased ') 

            }
        }

        if(!token){
            res.status(401)
            throw new Error('not authorised , no token ')
        }

    })

}

