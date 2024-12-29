import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from './routes/index.route';
import threadRoute from "./routes/thread";
import userRoute from "./routes/users";
import authRoute from "./routes/auth";
import bodyParser from "body-parser";
import cors from "cors"
const app = express();

app.use(bodyParser.json()); // for JSON data
app.use(bodyParser.urlencoded({ extended: true })); // for URL-encoded data
app.use(cors())
dotenv.config();


const PORT = process.env.PORT;

app.use(express.json());
app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 
app.use('/api', router);

app.listen(PORT, () => { 
  console.log("Server running at PORT:",PORT); 
}).on("error", (error) => {
  
  throw new Error(error.message);
});