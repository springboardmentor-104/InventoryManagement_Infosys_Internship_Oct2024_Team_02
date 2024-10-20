const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// User Schema
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpires: Date
});

const User = mongoose.model('User', UserSchema);

// Email verification API
const emailVerificationApiKey = process.env.API_VARI;

// Function to verify email existence
async function verifyEmail(email) {
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=2e043ff94ec3410f81158608be8c300c&email=christinasharanyaa11a@gmail.com`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        return data.is_valid_format.value && data.deliverability === 'DELIVERABLE';
    } catch (error) {
        console.error('Error verifying email:', error);
        return false;
    }
}

// Function to validate password strength
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Generate random 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Replace with your email
        pass: process.env.EMAIL_PASS // Replace with your email password
    }
});

// Send OTP to user's email
async function sendOTP(email, otp) {
    let mailOptions = {
        from: "kryptonix.sih.2024@gmail.com",
        to: email,
        subject: 'Your OTP for verification',
        text: `Your OTP for email verification is ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent to email:', email);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Register route
// app.post('/register', async (req, res) => {
//     const { firstName, lastName, email, phone, password } = req.body;

//     // Validate required fields
//     if (!firstName || !lastName || !email || !password || !phone) {
//         return res.json({ success: false, message: 'All fields are required!' });
//     }

//     // Validate password strength
//     if (!validatePassword(password)) {
//         return res.json({ success: false, message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' });
//     }

//     try {
//         // Check if user already exists
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.json({ success: false, message: 'Email already exists' });
//         }

//         // Verify email existence
//         const emailIsValid = await verifyEmail(email);
//         if (!emailIsValid) {
//             return res.json({ success: false, message: 'Invalid email or email does not exist!' });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Generate OTP
//         const otp = generateOTP();
//         const otpExpires = Date.now() + 3600000; // 1 hour expiry

//         // Save user with OTP and hashed password
//         user = new User({ firstName, lastName, email, phone, password: hashedPassword, otp, otpExpires });
//         await user.save();

//         // Send OTP to user's email
//         await sendOTP(email, otp);

//         res.json({ success: true, message: 'User registered, check your email for OTP.' });
//     } catch (err) {
//         console.error('Server error:', err);
//         res.status(500).send('Server error');
//     }
// });
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phone) {
        return res.json({ success: false, message: 'All fields are required!' });
    }

    // Validate password strength
    if (!validatePassword(password)) {
        return res.json({ success: false, message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: 'Email already exists' });
        }

        // Verify email existence
        const emailIsValid = await verifyEmail(email);
        if (!emailIsValid) {
            return res.json({ success: false, message: 'Invalid email or email does not exist!' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = generateOTP();
        const otpExpires = Date.now() + 3600000; // 1 hour expiry

        // Save user with OTP and hashed password
        user = new User({ firstName, lastName, email, phone, password: hashedPassword, otp, otpExpires });
        await user.save();

        // Send OTP to user's email
        await sendOTP(email, otp);

        // After successful registration, redirect to OTP verification page
        res.json({ success: true, message: 'User registered, check your email for OTP.', redirect: '/verify-otp' });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).send('Server error');
    }
});

// OTP verification route
app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.json({ success: false, message: 'Invalid or expired OTP' });
        }

        // Mark user as verified
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({ success: true, message: 'OTP verified, signup successful!' });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).send('Server error');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
