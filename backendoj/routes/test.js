import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
  res.send("[COMPILER BACKEND: HELLO]");
});
export default router;
