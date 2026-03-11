import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config(); 
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

console.log("SendGrid API Key:", process.env.SENDGRID_API_KEY);

export const sendEmail = async (notification: {
  to: string;
  message: string;
}) => {
  await sgMail.send({
    to: notification.to,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: "Notification",
    text: notification.message,
  });
};
