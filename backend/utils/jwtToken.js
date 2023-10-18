
import jwt from "jsonwebtoken";

export class jwtToken{

    static generateToken(userPayload , duration ){

        return jwt.sign({ userPayload }, process.env.JWT_SECRET, {
            expiresIn: duration ,
        })

    }
}
