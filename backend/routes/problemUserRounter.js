import express from "express";
import {
  readproblem,
  readproblems,
} from "../controller/problemUserController.js";
const router = express.Router();

router.post("/read", readproblems);
router.get("/read/:id", readproblem);

export default router;
