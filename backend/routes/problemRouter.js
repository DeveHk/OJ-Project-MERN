import express from "express";
import { loginUser, refreash, isLogin } from "../controller/authController.js";
import { createproblem, readProblem } from "../controller/problemController.js";
import {
  authorizationAdmin,
  authorizationJWT,
} from "../controller/authoController.js";
const router = express.Router();

router.post("/create", authorizationJWT, authorizationAdmin, createproblem);
router.get("/read", authorizationJWT, authorizationAdmin, readProblem);
router.post("/update", isLogin);
router.get("/delete", refreash);
export default router;
