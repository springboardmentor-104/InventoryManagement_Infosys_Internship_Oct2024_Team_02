
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import nodemailer from 'nodemailer';
 
export const sendVerificationEmail = async (email, verificationToken) => {
	const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shucsarkar@gmail.com', 
            pass: process.env.PASS,     //app pass    
        },
    });

    const mailOptions = {
        from: 'shucsarkar@gmail.com',
        to: email,
        subject: "Verify your email",
        text: `OTP for Email Verification is`,
		html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    };

	try {
		await transporter.sendMail(mailOptions);

		console.log("Email sent successfully");
	} catch (error) {
		console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
	}
};




