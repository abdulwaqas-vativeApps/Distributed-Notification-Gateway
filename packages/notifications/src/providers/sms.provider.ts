import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config(); 

const client = twilio(
  process.env.TWILIO_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

console.log("Twilio client initialized with SID:", process.env.TWILIO_SID); 
console.log("Twilio client initialized with Auth Token:", process.env.TWILIO_AUTH_TOKEN); 

export const sendSms = async (notification: {
  to: string;
  message: string;
}) => {
  await client.messages.create({
    body: notification.message,
    from: process.env.TWILIO_PHONE_NUMBER!,
    to: notification.to,
  });
};