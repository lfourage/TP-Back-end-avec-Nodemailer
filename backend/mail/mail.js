import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/*nodemailer.createTestAccount((err, account) => {
    if (err)
        console.error(err);
    else
        console.log(account);
})*/

export const transporter = nodemailer.createTransport({
    host: process.env.ETHEREAL_SMTP_HOST,
    port: process.env.ETHEREAL_SMTP_PORT,
    secure: false,
  auth: {
    user: process.env.ETHEREAL_USERNAME,
    pass: process.env.ETHEREAL_PASSWORD,
  },
});

export async function sendVerificationEmail(toEmail, token) {
    const verificationUrl = `http://localhost:3000/verify?token=${token}`;

    const mailOptions = {
        from: `""App" ${process.env.ETHEREAL_USERNAME}`,
        to: toEmail,
        subject: "Verifiez votre email",
        html: `<p><a href=${verificationUrl}>Verifiez votre email</a></p>`
    };

    await transporter.sendMail(mailOptions);
}
