import '../Config/config.js'
import nodemailer from 'nodemailer';


// console.log(" email :" ,process.env.MAIL_USER);
// console.log("PAss", process.env.MAIL_PASS);
const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth :{
        user : process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,

        
    },
});

export const sendWelcomeEmail = async (to, name) => {
    const mailOptions = {
        from :`" Nitish" <${process.env.MAIL_USER}>`,
        to,
        subject : 'Welcome to our App',
        html : `<h2>Hello ${name}, </h2> <p> Welcome to our app ! we are glad to have you onboard </p>`,
    };
     await transporter.sendMail(mailOptions);
}
