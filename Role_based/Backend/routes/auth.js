import express from 'express';
import User from '../Models/user_model.js'
import {signup,login,Updateprofile,logout,forgotPassword,
	resetPassword, verifyEmail,checkAuth} from "../Controllers/auth_controller.js";
const router=express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);
router.get("/checkAuth", checkAuth);

router.post("/verifyEmail",verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);


router.patch("/edit-profile",async (req, res) => {
    try {
        // Destructure fields from the request body
        const { userId, name, image,phone,address} = req.body;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).send({ message: 'User ID is required' });
        }

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Update the user's profile with provided fields
        if (name !== undefined) user.name = name;
        if (image !== undefined) user.image = image;
        if (phone!== undefined) user.phone = phone;
        if (address!== undefined) user.address = address;

        // Save the updated user profile
        await user.save();

        // Send the updated user profile as the response
        res.status(200).send({
            message: 'Profile updated successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                phone: user.phone,
                address: user.address,
                role: user.role,
            }
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send({ message: 'Profile update failed' });
    }
});

export default router;