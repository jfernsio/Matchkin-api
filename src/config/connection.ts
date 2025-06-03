import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const url  = process.env.MongoDB_URL ;
    await mongoose.connect(url as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Error connecting to db : ${error}`);
    process.exit(1);
  }
};

export default connectDB;