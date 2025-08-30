import express from "express";
import auth from "../middlewares/auth.js";
import {
  booking,
  cancelBooking,
} from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/booking/:id", auth, booking);

bookingRouter.delete("/cancel-booking/:id", auth, cancelBooking);

export default bookingRouter;
