import express from "express";
import DBConnection from "./database/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter.js";
import testRouter from "./routes/test.js";
import cors from "cors";
const app = express();
DBConnection();
app.use(
  cors({
    origin: process.env.CLIENT, // your frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/", testRouter);

app.listen(process.env.PORT, () => {
  console.log("[running]");
});
