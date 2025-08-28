import express from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  deleteListingById,
  getListing,
  getListingById,
  listing,
  updateListingById,
} from "../controllers/listing.controller.js";

const listingRouter = express.Router();

listingRouter.post("/listing", auth, upload.single("backendImage"), listing);

listingRouter.get("/all-listing", getListing);

listingRouter.post("/listing-card/:id", auth, getListingById);

listingRouter.post(
  "/update-listing/:id",
  auth,
  upload.single("backendImage"),
  updateListingById
);

listingRouter.delete("/delete-listing/:id", auth, deleteListingById);

export default listingRouter;
