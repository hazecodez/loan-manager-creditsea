import { serverCreation } from "./config/app";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const startServer = async () => {
  try {
    connectDB();
    const app = serverCreation();

    app?.listen(3000, () => {
      console.log("server running on port 3000");
    });
  } catch (error) {
    console.log("Server starting error:", error);
  }
};

startServer();
