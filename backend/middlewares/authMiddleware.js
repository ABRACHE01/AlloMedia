
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js';

export class authMiddleware {
  static protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies.token || req.params.token) {
      try {
     
        token = req.cookies.token || req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userPayload.id).populate('role').select('-password');
        
        if (!user) {
          res.status(401);
          throw new Error('User not found');
        }

        
        switch (user.role.name) {

            case 'Admin':

                if (req.originalUrl.startsWith('/api/user/admin')) {  

                    req.user = user;
                    next()

                  } else {
                    res.status(403).send('Access denied for this URL');
                  }
                  break;   

            case 'Client':
                console.log(req.originalUrl)

                if (req.originalUrl.startsWith('/api/user/client')) {
             
                    req.user = user;
                    next()

                  } else {
                    res.status(403).send('Access denied for this URL');
                  }
                  break; 

            case 'Deliver':

                if (req.originalUrl.startsWith('/api/user/deliver')) {

                    req.user = user;
                    next()

                  } else {
                    res.status(403).send('Access denied for this URL');
                  }
                  break; 

            default:
              res.status(403).send('Access denied. User does not have the required role');
          }
          
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Not authorized');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  });
}


