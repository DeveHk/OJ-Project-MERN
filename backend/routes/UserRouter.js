import express from "express";
import { profileHandler } from "../controller/userControler/Profile.js";
import { submissionHandler } from "../controller/userControler/Submission.js";
import { authorizationJWT } from "../controller/authoController/authorizationJWT.js";
import { authorizationUser } from "../controller/authoController/authorizationUser.js";
const router = express.Router();

router.get("/profile", authorizationJWT, profileHandler);
router.get(
  "/submissions",
  authorizationJWT,
  authorizationUser,
  submissionHandler
);

export default router;
