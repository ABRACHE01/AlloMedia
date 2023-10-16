
import  express from "express";
import {userRoutes} from './routes/userRoutes.js'
import colors from "colors"
import {connectDB} from "./config/database.js"
connectDB();

const app = express();
import { config } from 'dotenv';
config();

const port = process.env.PORT ;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", userRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
