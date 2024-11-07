import express from 'express';
import {signup,login,logout, verifyEmail,checkAuth} from "../Controllers/auth_controller.js";
const router=express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);
router.get("/checkAuth", checkAuth);

router.post("/verifyEmail",verifyEmail);



export default router;