const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); 
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
    optionsSuccessStatus: 200
}));

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Nodemailer setup
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
};

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                if(user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The Password is Incorrect");
                }
            } else {
                res.json("No record exists");
            }
        })
        .catch(err => res.status(500).json(err));
});

// Register Route
app.post('/register', async (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

// Forgot Password Route
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (!user) {
                return res.send({ Status: "User not existed" });
            }

            const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });
            const transporter = createTransporter();

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to:email,
                subject: 'Reset Your Password',
                text: `http://localhost:5173/reset-password/${user._id}/${token}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.send({ Status: "Failed to send email" });
                } else {
                    res.send({ Status: "Success" });
                }
            });
        })
        .catch(err => res.status(500).json(err));
});

// Reset Password Route
app.post('/reset-password/:id/:token', (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error with token" });
        } else {
            UserModel.findByIdAndUpdate(id, { password: password })
                .then(() => res.send({ Status: "Success" }))
                .catch(err => res.send({ Status: err.message }));
        }
    });
});


// Sample Inventory Route (Assuming InventoryModel exists)
app.get('/api/inventory', (req, res) => {
    UserModel.find()
        .then(items => res.json(items))
        .catch(err => res.status(500).json(err));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
