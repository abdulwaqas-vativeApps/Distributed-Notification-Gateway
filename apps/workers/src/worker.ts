import { prisma } from "@repo/database";
import { sendEmail } from "./providers/email.provider";
import { sendSms } from "./providers/sms.provider";

const strategies = { email: sendEmail, sms: sendSms };
const MAX_RETRIES = 3;
const BASE_DELAY = 1000; // 1 sec

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

type Channel = "email" | "sms";

export const processNotification = async (notification: {
  id: string;
  channel: Channel;
  to: string;
  message: string;
  retries?: number;
}) => {
  const channelHandler = strategies[notification.channel];
  if (!channelHandler)
    throw new Error(`No handler for ${notification.channel}`);

  let attempt = notification.retries || 0;

  while (attempt < MAX_RETRIES) {
    try {
      await channelHandler(notification); // provider call
      await prisma.notification.update({
        where: { id: notification.id },
        data: { status: "COMPLETED", retries: attempt + 1 },
      });
      console.log(
        JSON.stringify({
          level: "info",
          message: "Notification sent",
          jobId: notification.id,
        }),
      );
      return;
    } catch (err: any) {
      attempt++;
      if (attempt >= MAX_RETRIES) {
        await prisma.notification.update({
          where: { id: notification.id },
          data: { status: "FAILED", retries: attempt, error: err.message },
        });
        console.error(
          JSON.stringify({
            level: "error",
            message: "Notification failed",
            jobId: notification.id,
            reason: err.message,
          }),
        );
        return;
      }
      const delay = BASE_DELAY * Math.pow(2, attempt);
      console.log(`Retry #${attempt} for ${notification.id} in ${delay}ms`);
      await sleep(delay);
    }
  }
};
