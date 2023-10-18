
import  jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import {User} from '../models/userModel.js'


export class authMiddleware{

    static protect = asyncHandler(async(req ,res , next )=>{

        let token 

        if (req.cookies.token || res.params.token ){
            try{
                token = req.cookies.token
                const decoded = jwt.verify(token , process.env.JWT_SECRET)
                req.user = await User.findById(decoded.userPayload.id).populate('role').select('-password')
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

