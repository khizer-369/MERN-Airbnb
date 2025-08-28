import express from "express";
import auth from "../middlewares/auth.js";
import {
  booking,
  cancelBooking,
  getBooking,
} from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/booking/:id", auth, booking);

bookingRouter.delete("/cancel-booking/:id", auth, cancelBooking);

bookingRouter.get("/all-booking", getBooking);

export default bookingRouter;
