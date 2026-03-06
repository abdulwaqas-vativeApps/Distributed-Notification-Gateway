import Twilio from "twilio";

const client = new Twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);

export const sendSms = async (notification: { to: string, message: string }) => {
  await client.messages.create({
    body: notification.message,
    from: process.env.TWILIO_PHONE_NUMBER!,
    to: notification.to,
  });
};