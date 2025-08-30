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
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "https://mern-airbnb-frontend.vercel.app", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", userRouter);
app.use("/api", listingRouter);
app.use("/api", bookingRouter);

// MongoDB se connect karna aur phir server start karna
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ Database Connected!");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
  });
