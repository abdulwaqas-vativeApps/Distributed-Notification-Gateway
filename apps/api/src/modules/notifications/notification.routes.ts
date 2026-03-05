import { Router } from "express";
import { createNotification } from "./notification.controller";
import { getNotificationStatus } from "./notification.controller";

const router = Router();

router.post("/", createNotification);
router.get("/:id", getNotificationStatus);

export default router;