import { prisma } from "@repo/database";
import { CreateNotificationDTO } from "@repo/shared-schema/src/notification.types";

export const createNotificationService = async (
  data: CreateNotificationDTO,
  idempotencyKey: string
) => {

  console.log("notification service");

  const existing = await prisma.notification.findUnique({
    where: {
      idempotency: idempotencyKey
    }
  });

  if (existing) {
    console.log("existing", existing)
    return existing;
  }

  const notification = await prisma.notification.create({
    data: {
      channel: data.channel,
      to: data.to,
      message: data.message,
      status: "PENDING",
      idempotency: idempotencyKey
    }
  });

  return notification;
};

export const getNotificationStatusService = async (id: string) => {
  return prisma.notification.findUnique({
    where: { id }
  });
};