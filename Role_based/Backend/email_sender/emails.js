
import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailTemplate.js";
import nodemailer from 'nodemailer';
 
export const sendVerificationEmail = async (email, verificationToken) => {
	const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shuctikasarkar6@gmail.com', 
            pass: process.env.PASS,     //app pass    
        },
    });

    const mailOptions = {
        from: 'shuctikasarkar6@gmail.com',
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


export const sendPasswordResetEmail = async (email, resetURL) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shuctikasarkar6@gmail.com', 
            pass: process.env.PASS,     //app pass    
        },
    });
	const mailOptions = {
        from: 'shuctikasarkar6@gmail.com',
        to: email,
        subject: "Reset your password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        text: `Password Reset`,
    };

	try {
		await transporter.sendMail(mailOptions);

		console.log("Email sent successfully");
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};



export const sendResetSuccessEmail = async (email) => {
	const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shuctikasarkar6@gmail.com', 
            pass: process.env.PASS,     //app pass    
        },
    });

    const mailOptions = {
        from: 'shuctikasarkar6@gmail.com',
        to: email,
        subject: "Password Reset Successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        text: `Password Reset`,
    };

	try {
		await transporter.sendMail(mailOptions);

		console.log("Password reset email sent successfully");
	}catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};







