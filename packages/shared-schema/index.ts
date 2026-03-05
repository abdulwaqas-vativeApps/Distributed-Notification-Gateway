import { z } from "zod";

export const NotificationSchema = z.object({
  channel: z.enum(["email", "sms"]),
  to: z.string().email(),
  message: z.string().min(1),
});

export type NotificationRequest = z.infer<typeof NotificationSchema>;

export enum NotificationStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}