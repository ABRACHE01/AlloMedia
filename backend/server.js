
import  express from "express";
import {apiRoutes} from "./routes/api.js"
import {db} from "./config/database.js"

const app = express();
import { config } from 'dotenv';
config();

const port = process.env.PORT ;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
app.use("/api", apiRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
