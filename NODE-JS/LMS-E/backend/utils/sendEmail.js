import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async function (email, subject, message) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    socketTimeout: 60000,  // Socket timeout after 60 seconds
    connectionTimeout: 60000,
  });

  // send mail with defined transport object
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: subject,
      html: message,
    });
    console.log("Email sent successfully to:", email);  // Log success
  } catch (error) {
    console.error("Error sending email:", error);  // Log detailed error
    throw new Error("Email sending failed");
  }
};

export default sendEmail;
