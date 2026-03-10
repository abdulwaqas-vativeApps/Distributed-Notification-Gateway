import { Request, Response } from "express";
import {
  createNotificationService,
  getNotificationStatusService
} from "./notification.service";

export const createNotification = async (req: Request, res: Response) => {

  const idempotencyKey = req.headers["x-idempotency-key"] as string;

  console.log("idempotencyKey", idempotencyKey);

  const notification = await createNotificationService(
    req.body,
    idempotencyKey
  );

  res.status(202).json(notification);
};

export const getNotificationStatus = async (req: Request, res: Response) => {

  const id = req.params.id as string;

  const notification = await getNotificationStatusService(id);

  res.json(notification);
};