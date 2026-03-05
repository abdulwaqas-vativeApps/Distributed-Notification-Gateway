import { z } from "zod";

export const createNotificationSchema = z.object({
  channel: z.enum(["EMAIL", "SMS"]),
  recipient: z.string(),
  message: z.string().min(1)
});