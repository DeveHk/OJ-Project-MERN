import User from "../models/User.js";
import Auth from "../models/Auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const refreash = async (req, res, next) => {
  console.log("[PROCEEDED refreash]");
  try {
    //1. Take token
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .send({ isAuthenticated: false, message: "Refresh token missing" });
    }
    //2. Verify token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          return res
            .status(403)
            .send({ isAuthenticated: false, message: "Invalid refresh token" });
        }
        //3. Generate and send new token
        const userdata = await User.findById(user.id);
        const newAccessToken = jwt.sign(
          { userdata },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );
        const accessTokenOptions = {
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
          httpOnly: true,
          sameSite: "strict",
        };
        res.cookie("accessToken", newAccessToken, accessTokenOptions);
        req.user = userdata;
        next();
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "[SERVER ERROR]", err });
  }
};

export const authorizationJWT = async (req, res, next) => {
  console.log("[PROCEEDED authorizationJWT]");
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    if (accessToken) {
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, user) => {
          if (err) {
            refreash(req, res, next);
          }
          //
          //FORWARD IF ACCESSTOKEN IS VALID AND EXISTS
          //
          req.user = user.userdata;
          next();
        }
      );
    } else {
      console.log("[NOT EXISTS authorizationJWT]");
      refreash(req, res, next);
    }
  } else {
    res.status(403).json({ isAuthenticated: false });
  }
};

export const authorizationAdmin = async (req, res, next) => {
  console.log("[PROCEEDED authorizationAdmin]");
  try {
    console.log(req.user);
    if (req.user.isAdmin == true) next();
    else {
      return res.status(403).send({
        message: "[NOT AUTHORISED]",
        isAuthenticated: true,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "[SERVER ERROR]", err });
  }
};

export const authorizationUser = async (req, res, next) => {
  console.log("[PROCEEDED authorizationUser]");
  try {
    console.log(req.user);
    if (req.user.isAdmin == false) next();
    else {
      return res.status(403).send({
        message: "[NOT AUTHORISED]",
        isAuthenticated: true,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "[SERVER ERROR]", err });
  }
};
