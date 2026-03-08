import express, { Application } from "express";
import cors from "cors";
import notificationRoutes from "./modules/notifications/notification.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/notifications", notificationRoutes);

export default app;