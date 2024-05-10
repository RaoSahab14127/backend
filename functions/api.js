import express from "express";
import serverless from "serverless-http";
import mongoose from "mongoose";
import router from "./routes/event.route.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    const uri = process.env.MONGOURI;
    if (!uri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Optionally, you might want to exit the application if MongoDB connection fails
    process.exit(1);
  }
};
connectToMongoDB();

// Use the router middleware function
app.use("/api", router);

// Export the app wrapped with serverless-http
export default serverless(app);
