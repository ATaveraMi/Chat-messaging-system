import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { H } from "@highlight-run/node";
dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: `${process.env.CORS_ORIGIN}`, credentials: true })); //cors is a middleware that allows us to make requests to the backend from the frontend, credentials: true is to send the cookie to the backend
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Initialize Highlight
H.init({
  projectID: process.env.VITE_HIGHLIGHT_PROJECT_ID, // You'll get this from highlight.io dashboard
  serviceName: "backend-service",
  environment: process.env.NODE_ENV || "development",
});

// Add error handling to catch unhandled errors
process.on("unhandledRejection", (reason, promise) => {
  H.consumeError(reason);
});

process.on("uncaughtException", (error) => {
  H.consumeError(error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
