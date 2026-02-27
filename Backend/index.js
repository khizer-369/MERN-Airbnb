import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://mern-airbnb-frontend.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", userRouter);
app.use("/api", listingRouter);
app.use("/api", bookingRouter);

// database connection (without app.listen)
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ Database Connected!"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

// 👇 IMPORTANT
export default app;
