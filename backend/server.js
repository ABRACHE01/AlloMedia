
import  express from "express";
import {connectDB} from "./config/database.js"
import {seedRoles} from "./config/roleSeeder.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import {userRoutes} from './routes/userRoutes.js'
import {adminRoutes} from './routes/adminRoutes.js'
import {clientRoutes} from './routes/clientRoutes.js'
import {deliverRoutes} from './routes/deliverRoutes.js'
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173' , 'http://localhost:3000' ]; 

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


const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
