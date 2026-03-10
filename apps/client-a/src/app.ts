import express from "express";
import dotenv from "dotenv";
dotenv.config(); 
import {notificationRoutes} from "@repo/notifications";
const app = express();

// Middleware
app.use(express.json()); // JSON body parse ke liye

// Attach core routes
app.use("/", notificationRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Client A API running on port ${PORT}`);
});