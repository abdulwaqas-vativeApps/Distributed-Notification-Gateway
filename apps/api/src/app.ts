import express from "express";
import cors from "cors";
import notificationRoutes from "./modules/notifications/notification.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/notifications", notificationRoutes);

export default app;