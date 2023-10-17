
import jwt from "jsonwebtoken";

export class jwtToken{

    static generateToken(id , duration ){

        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: duration ,
        })

    }
}
