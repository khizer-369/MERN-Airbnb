import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    landMark: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    checkIn: {
      type: Date,
      require: true,
    },
    checkOut: {
      type: Date,
      require: true,
    },
    totalRent: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
