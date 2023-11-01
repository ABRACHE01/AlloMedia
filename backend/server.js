
import  express from "express";
import colors from "colors"
import {connectDB} from "./config/database.js"
import {seedRoles} from "./config/roleSeeder.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import {userRoutes} from './routes/userRoutes.js'
import {adminRoutes} from './routes/adminRoutes.js'
import {clientRoutes} from './routes/clientRoutes.js'
import {deliverRoutes} from './routes/deliverRoutes.js'

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173']; 

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

import { config } from 'dotenv';
config();

const port = process.env.PORT ;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", userRoutes)
app.use("/api/user", adminRoutes)
app.use("/api/user", clientRoutes)
app.use("/api/user", deliverRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
