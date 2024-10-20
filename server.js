const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To handle form submissions
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Database setup
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err);
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

// Email Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Register route
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    try {
        // Check if email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 3600000; // 1 hour expiry

        // Save user in DB
        user = new User({ firstName, lastName, email, phone, password: hashedPassword, otp, otpExpires });
        await user.save();

        // Send OTP via email
        await transporter.sendMail({
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is ${otp}`
        });

        res.json({ success: true, message: 'User registered, check email for OTP' });
    } catch (err) {
        console.error(err);
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

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({ success: true, message: 'OTP verified' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
