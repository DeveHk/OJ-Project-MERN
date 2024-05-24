import express from "express";
import {
  registerUser,
  loginUser,
  refreash,
  isLogin,
} from "../controller/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/islogin", isLogin);
router.get("/refresh", refreash);
export default router;
