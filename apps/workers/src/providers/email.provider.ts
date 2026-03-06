import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (notification: {
  to: string;
  message: string;
}) => {
  await sgMail.send({
    to: notification.to,
    from: "no-reply@vativeapps.com",
    subject: "Notification",
    text: notification.message,
  });
};
