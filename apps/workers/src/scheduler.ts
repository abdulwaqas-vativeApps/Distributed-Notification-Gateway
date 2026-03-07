import { prisma } from "@repo/database";
import { processNotification } from "./worker";

const POLL_INTERVAL = 5000;

console.log("Worker started...1");
export const startWorker = async () => {
  console.log("Worker started...2");
  setInterval(async () => {
    const pendingNotifications = await prisma.notification.findMany({
      where: { status: "PENDING" },
    });
    for (const notification of pendingNotifications) {
      await processNotification({
        ...notification,
        channel: notification.channel as "EMAIL" | "SMS",
      });
    }
  }, POLL_INTERVAL);
};

startWorker();
