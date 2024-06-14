import express from "express";
import testRouter from "./routes/test.js";
import cors from "cors";
import DBConnection from "./db/connection.js";
import cookieParser from "cookie-parser";
import compilerRouter from "./routes/compilerRoutes.js";
const app = express();
DBConnection();
app.use(
  cors({
    origin: [process.env.CLIENT, process.env.RELEASE, process.env.PRODUCTION], // your frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/compiler", compilerRouter);
app.use("/", testRouter);

app.listen(process.env.PORT, () => {
  //console.log("[SERVER COMPILER RUNNNING]");
});
