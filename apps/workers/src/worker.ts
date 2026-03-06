import { prisma } from "@repo/database";
import { sendEmail } from "./providers/email.provider";
import { sendSms } from "./providers/sms.provider";

const strategies = { email: sendEmail, sms: sendSms };
const MAX_RETRIES = 3;
const BASE_DELAY = 1000; // 1 sec

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export const processNotification = async (notification: { id: string, channel: string, to: string, message: string, attempts?: number }) => {
  const channelHandler = strategies[notification.channel];
  if (!channelHandler) throw new Error(`No handler for ${notification.channel}`);

  let attempt = notification.attempts || 0;

  while (attempt < MAX_RETRIES) {
    try {
      await channelHandler(notification); // provider call
      await prisma.notification.update({ where: { id: notification.id }, data: { status: "COMPLETED", attempts: attempt + 1 } });
      console.log(JSON.stringify({ level: "info", message: "Notification sent", jobId: notification.id }));
      return;
    } catch (err: any) {
      attempt++;
      if (attempt >= MAX_RETRIES) {
        await prisma.notification.update({ where: { id: notification.id }, data: { status: "FAILED", attempts: attempt, error: err.message } });
        console.error(JSON.stringify({ level: "error", message: "Notification failed", jobId: notification.id, reason: err.message }));
        return;
      }
      const delay = BASE_DELAY * Math.pow(2, attempt);
      console.log(`Retry #${attempt} for ${notification.id} in ${delay}ms`);
      await sleep(delay);
    }
  }
};