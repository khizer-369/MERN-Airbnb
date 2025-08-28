import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "You don't have token" });
    }

    const getUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!getUser) {
      return res.status(400).json({ message: "Invalid token" });
    }

    req.userId = getUser.ID;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

export default auth;
