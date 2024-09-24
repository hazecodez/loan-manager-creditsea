import express from "express";
import http from "http";
import userRouter from "../routes/userRoutes";
import adminRouter from "../routes/adminRoutes";
import cors from "cors"

export const serverCreation = () => {
  try {
    const app = express();
    app.use(cors())
    app.use(express.json());

    app.use("/", userRouter);
    app.use("/admin", adminRouter);

    const server = http.createServer(app);

    return server;
  } catch (error) {
    console.log("server creation error:", error);
  }
};
