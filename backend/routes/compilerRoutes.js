import express from "express";
import { compiler } from "../controller/compilerControler/compilerControler.js";
import {
  authorizationJWT,
  authorizationUser,
} from "../controller/authoController.js";
import { submission } from "../controller/compilerControler/submissionControler.js";
const router = express.Router();
router.post("/run", authorizationJWT, authorizationUser, compiler);
router.post("/submit", authorizationJWT, authorizationUser, submission);

export default router;
