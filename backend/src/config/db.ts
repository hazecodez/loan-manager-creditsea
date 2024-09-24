import mongoose from "mongoose";

export const connectDB = () => {
  try {
    const MongoUri = process.env.MONGO_URI as string;

    mongoose
      .connect(MongoUri)
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => console.log("DB connection error:", err));
  } catch (error) {
    console.log(error);
  }
};
