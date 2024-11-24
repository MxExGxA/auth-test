import mongoose from "mongoose";

export const db_connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("connected to database successfully");
  } catch (err) {
    console.log("failed to connect to database", err);
  }
};
