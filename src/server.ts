import express from "express";
import { configDotenv } from "dotenv";
import { db_connect } from "./utils/db";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import cors from "cors";
import { corsConfig } from "./config/cors";
import cookieParser = require("cookie-parser");
import path from "path";

configDotenv();
db_connect();

const app = express();
app.use(cors(corsConfig()));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(4000, () => {
  console.log("server is running on port", 4000);
});
