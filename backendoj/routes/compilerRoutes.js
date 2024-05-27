import express from "express";
import { compiler } from "../controller/compilerControler/compilerControler.js";
const router = express.Router();
router.post("/run", compiler);

export default router;
