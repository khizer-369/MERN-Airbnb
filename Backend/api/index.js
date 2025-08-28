import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/dbConnect.js";
import userRouter from "../routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import listingRouter from "../routes/listing.routes.js";
import bookingRouter from "../routes/booking.routes.js";
import serverless from "serverless-http";

dotenv.config();

const app = express();

dbConnect();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", listingRouter);
app.use("/api", bookingRouter);

export default serverless(app);
