import express from "express";
import dotenv from "dotenv";
import { NoteRoute } from "./src/routes/noteRoutes.js";
import connectDB from "./db/db.js";
import { rateLimiter } from "./middleware/rateLimitter.js";
import cors from 'cors'
const app = express();
dotenv.config();
//middleware
app.use(cors({
  origin : 'http://localhost:5173'
}))
app.use(express.json());
app.use(rateLimiter);
//
app.use("/api/notes", NoteRoute);
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `your server is listening on http://localhost:${process.env.PORT}`
    );
  });
});
