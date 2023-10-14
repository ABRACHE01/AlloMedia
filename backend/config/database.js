
import mongoose from "mongoose";
import { config } from 'dotenv';
config();

const dbURI = process.env.MONGODB_URI ; 

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

export { db }