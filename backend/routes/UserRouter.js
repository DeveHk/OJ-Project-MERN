import express from "express";
import {
  authorizationJWT,
  authorizationUser,
} from "../controller/authoController.js";
import { profileHandler } from "../controller/userControler/Profile.js";
import { submissionHandler } from "../controller/userControler/Submission.js";
const router = express.Router();

router.get("/profile", authorizationJWT, profileHandler);
router.get(
  "/submissions",
  authorizationJWT,
  authorizationUser,
  submissionHandler
);

export default router;
