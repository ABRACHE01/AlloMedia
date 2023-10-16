
import jwt from "jsonwebtoken";

export class jwtToken{

    static generateToken(id){

        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        })

    }
}
