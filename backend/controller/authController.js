import User from "../models/User.js";
import Auth from "../models/Auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    //1. Check all parameters there
    const { fname, lname, email, password, username, isAdmin } = req.body;
    if (!fname || !lname || !email || !password || !username || !isAdmin) {
      return res.status(400).send("[Some Info Missing]");
    }

    //2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //3. Create User
    const user = await User.create({
      username,
      fname,
      lname,
      email,
      isAdmin: isAdmin == "T" ? true : false,
    });
    const key = await Auth.create({
      u_id: user._id,
      password: hashedPassword,
    });
    console.log("[User Saved]", user, key);

    //4. Response User
    const resUser = {
      message: "User Created",
      user: user._doc,
    };
    res.status(200).send(resUser);
  } catch (err) {
    console.log(err);
    if (err.code == 11000)
      return res.status(400).send({ message: "[USER EXISTS]" });
    return res.status(500).send({ message: "[SERVER ERROR]", err });
  }
};

export const loginUser = async (req, res) => {
  try {
    //1. Check all parameters there
    const { email, password, username } = req.body;
    if (!(email || username) || !password) {
      return res.status(400).send("[Some Info Missing]");
    }

    //2. Check if User is there
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (!user) {
      return res.status(404).send("NO USER FOUND");
    }
    //3. Check if Password valid is there
    const key = await Auth.findOne({
      u_id: user._id,
    });
    const validPassword = await bcrypt.compare(password, key.password);
    if (!validPassword) {
      return res.status(404).send("WRONG PASSWORD");
    }

    //4. Generatet JWT and send to user
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    const resUser = {
      message: "User Logged In",
      user: user._doc,
      token,
    };

    const option = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, option).json(resUser);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "[SERVER ERROR]", err });
  }
};
