import express from 'express';
import {signup,login,logout,forgotPassword,
	resetPassword, verifyEmail,checkAuth} from "../Controllers/auth_controller.js";
const router=express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);
router.get("/checkAuth", checkAuth);

router.post("/verifyEmail",verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);


export default router;