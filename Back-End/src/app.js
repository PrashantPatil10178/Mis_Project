import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routers

import userRouter from "./routes/user.routes.js";

//router declaration

app.use("/api/v1/users", userRouter);

//Address of this route becomes
// http://localhost:8000/api/v1/users/register

app.use("/api/v1/login", userRouter);

export { app };
