import Booking from "../models/booking.js";
import Listing from "../models/listing.js";
import User from "../models/user.model.js";
import nodeMailer from "nodemailer";

export const booking = async (req, res) => {
  try {
    let guest = req.userId;
    let { id } = req.params;
    let {
      checkIn,
      checkOut,
      totalRent,
      totalDays,
      title,
      image,
      city,
      landMark,
      price,
      category,
    } = req.body;
    if (
      !id ||
      !checkIn ||
      !checkOut ||
      !totalRent ||
      !totalDays ||
      !title ||
      !image ||
      !city ||
      !landMark ||
      !price ||
      !category
    ) {
      return res
        .status(400)
        .json({ message: "Please fill in all the details" });
    }

    let listingById = await Listing.findById(id);

    if (!listingById) {
      return res.status(400).json({ message: "Listing not found" });
    }

    if (listingById.price != totalRent / totalDays) {
      return res.status(400).json({ message: "Please give original rent" });
    }

    if (listingById.status) {
      return res.status(400).json({ message: "Listing is already booked" });
    }

    if (listingById.host == guest) {
      return res.status(400).json({ message: "You can't book" });
    }

    let createdBooking = await Booking.create({
      host: listingById.host,
      guest,
      listing: listingById._id,
      checkIn,
      checkOut,
      totalRent,
      title,
      image,
      city,
      landMark,
      price,
      category,
    });

    await Listing.findByIdAndUpdate(
      id,
      {
        guest,
        status: true,
      },
      { new: true }
    );

    let hostUser = await User.findByIdAndUpdate(
      listingById.host,
      {
        $push: { booking: createdBooking._id },
      },
      { new: true }
    );

    let guestUser = await User.findById(guest);

    const formatDate = (date) =>
      new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: hostUser.email,
      subject: `Your Listing "${title}" Has Been Successfully Booked!`,
      text: `We are pleased to inform you that your listing titled "${title}" located in ${city}, near ${landMark}, has been successfully booked.

🔹 Guest: ${guestUser.userName}  
🔹 Check-In: ${formatDate(checkIn)}  
🔹 Check-Out: ${formatDate(checkOut)}  
🔹 Total Rent: ₹${totalRent}  
🔹 Category: ${category}

Please make sure the listing is ready before the guest's arrival.

Thank you for using our platform.

Best regards,  
Airbnb (Not Real)`,
    };

    transporter.sendMail(mailOption, (error) => {
      if (error) {
        console.log(error);
      }
    });

    return res.status(200).json({ message: "Booking Complete" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    let guest = req.userId;
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Please give listing id" });
    }

    let booking = await Booking.findOneAndDelete({ listing: id, guest });

    if (!booking) {
      return res.status(400).json({ message: "Booking not found" });
    }

    let listing = await Listing.findOneAndUpdate(
      { _id: id, guest },
      { status: false, guest: null }
    );

    if (!listing) {
      return res.status(400).json({ message: "Listing not found" });
    }

    await User.findByIdAndUpdate(listing.host, {
      $pull: { booking: booking._id },
    });

    let hostUser = await User.findById(listing.host);
    let guestUser = await User.findById(guest);

    const formatDate = (date) =>
      new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: hostUser.email,
      subject: `Booking Cancelled: "${booking.title}"`,
      text: `Hello ${hostUser.userName},
  
  We wanted to inform you that the booking for your listing titled "${
    booking.title
  }" located in ${booking.city}, near ${
        booking.landMark
      } has been cancelled by the guest.
  
  Guest: ${guestUser.userName}  
  Original Check-In: ${formatDate(booking.checkIn)}  
  Original Check-Out: ${formatDate(booking.checkOut)}  
  Total Rent: ₹${booking.totalRent}
  
  Your listing is now available for new bookings.
  
  Thank you,  
  Airbnb(Not Real)`,
    };

    transporter.sendMail(mailOption, (error) => {
      if (error) {
        console.log("Cancel booking email error:", error);
      }
    });

    return res.status(200).json({ message: "Booking Cancel" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getBooking = async (req, res) => {
  try {
    let allBooking = await Booking.find();
    return res.status(200).json(allBooking);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
