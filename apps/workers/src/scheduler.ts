import { prisma } from "@repo/database";
import { processNotification } from "./worker";

const POLL_INTERVAL = 5000;

export const startWorker = async () => {
  console.log("Worker started...");
  setInterval(async () => {
    const pendingNotifications = await prisma.notification.findMany({ where: { status: "PENDING" } });
    for (const notification of pendingNotifications) {
      processNotification(notification);
    }
  }, POLL_INTERVAL);
};

startWorker();