import generateToken from "../config/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all the details" });
    }

    let userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    let createUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    let userWithOutPassword = createUser.toObject();
    delete userWithOutPassword.password;

    let token = await generateToken(createUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json(userWithOutPassword);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all the details" });
    }

    let findUser = await User.findOne({ email })
      .populate(
        "listing",
        "host title description image city landMark price category status"
      )
      .populate(
        "booking",
        "host guest listing title image city landMark price category checkIn checkOut totalRent"
      )
      .sort({ createdAt: -1 });

    if (!findUser) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const userWithOutPassword = findUser.toObject();
    delete userWithOutPassword.password;

    const token = await generateToken(findUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(userWithOutPassword);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    let userId = req.userId;
    let getUser = await User.findById(userId)
      .select("-password")
      .populate(
        "listing",
        "host title description image city landMark price category status"
      )
      .populate(
        "booking",
        "host guest listing title image city landMark price category status checkIn checkOut totalRent"
      );
    if (!getUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};
