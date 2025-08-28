import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const imageUploader = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  if (!filePath) {
    return null;
  }

  try {
    let responseUrl = await cloudinary.uploader.upload(filePath);
    return responseUrl.secure_url;
  } catch (error) {
    console.log(error);
  }
  fs.unlinkSync(filePath);
};

export default imageUploader;
