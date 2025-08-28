import imageUploader from "../config/cloudinary.js";
import Listing from "../models/listing.js";
import User from "../models/user.model.js";

export const listing = async (req, res) => {
  try {
    let host = req.userId;
    const { title, description, city, landMark, price, category } = req.body;

    let image = req.file.path;
    if (
      !host ||
      !title ||
      !description ||
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

    let uploadUrl = await imageUploader(image);

    let createdListing = await Listing.create({
      host,
      title,
      description,
      image: uploadUrl,
      city,
      landMark,
      price,
      category,
    });

    await User.findByIdAndUpdate(host, {
      $push: { listing: createdListing._id },
    });

    return res.status(201).json({ message: "Create Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getListing = async (req, res) => {
  try {
    let listing = await Listing.find().sort({ createdAt: -1 });
    return res.status(200).json(listing);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getListingById = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Listing id not found" });
    }

    let ListingById = await Listing.findById(id);
    if (!ListingById) {
      return res.status(400).json({ message: "Listing not found" });
    }

    return res.status(200).json(ListingById);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const updateListingById = async (req, res) => {
  try {
    let host = req.userId;
    let { id } = req.params;
    let { title, description, city, landMark, price, category } = req.body;

    let image = req.file.path;

    if (!id) {
      return res.status(400).json({ message: "Please give Listing id" });
    }

    if (
      !title ||
      !description ||
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

    let listing = await Listing.findById(id);

    if (!listing) {
      return res.status(400).json({ message: "Listing not found" });
    }

    if (listing.host != host) {
      return res
        .status(400)
        .json({ message: "You are not the owner of this listing" });
    }

    if (listing.status) {
      return res.status(400).json({ message: "You can't edit" });
    }

    let uploadUrl = await imageUploader(image);

    await Listing.findByIdAndUpdate(id, {
      title,
      description,
      image: uploadUrl,
      city,
      landMark,
      price,
      category,
    });

    return res.status(200).json({ message: "Update Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deleteListingById = async (req, res) => {
  try {
    let host = req.userId;
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Please give Listing id" });
    }

    let listing = await Listing.findById(id);

    if (listing.host != host) {
      return res
        .status(400)
        .json({ message: "You are not the owner of this listing" });
    }

    if (listing.status) {
      return res.status(400).json({ message: "You can't delete" });
    }

    await Listing.findByIdAndDelete(id);

    await User.findByIdAndUpdate(host, { $pull: { listing: id } });

    return res.status(200).json({ message: "Delete Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
