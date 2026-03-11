import express,{ Application } from "express";
import { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config(); 
import {notificationRoutes} from "@repo/notifications";
const app: Application = express();

// Middleware
app.use(express.json());


// Attach core routes
app.use("/api/v1/notifications", notificationRoutes);

// Health check endpoint
app.get("/api/health", (req : Request, res : Response) => {
  res.status(200).json({ status: "ok" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Client A API running on port ${PORT}`);
});