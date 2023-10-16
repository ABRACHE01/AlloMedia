
import mongoose from "mongoose";
 import { config } from 'dotenv';
config();

const dbURI = process.env.MONGODB_URI ; 

const connectDB = async ()=>{

  try{
    const conn = await mongoose.connect(dbURI)
    console.log(`mongodb connected : ${conn.connection.host}`.cyan.underline)
  }catch(error){
    console.log(error) 
    process.exit(1)
  }

}

export {connectDB}