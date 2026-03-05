import { NotificationStatus } from "./enums";

export interface CreateNotificationDTO {
  channel: "EMAIL" | "SMS";
  to: string;
  message: string;
}

export interface NotificationResponse {
  id: string;
  status: NotificationStatus;
}