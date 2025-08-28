import jwt from "jsonwebtoken";

const generateToken = async (ID) => {
  try {
    let generatedToken = await jwt.sign({ ID }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return generatedToken;
  } catch (error) {
    console.log(error);
  }
};

export default generateToken;
