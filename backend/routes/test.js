import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
  res.send("[BACKEND: HELLO JI]");
});
export default router;
