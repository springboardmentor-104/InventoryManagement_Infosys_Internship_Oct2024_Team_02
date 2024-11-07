import {User} from '../Models/user_model.js';
import bcryptjs from 'bcryptjs';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../email_sender/emails.js';  


export const signup=async(req,res)=>{
        const {email,password,name,role}=req.body
    try{
        if(!name||!email||!password||!role){
            throw new Error("All fields are required");
        }
        
		
            const userAlreadyExists=await User.findOne({email});
            if(userAlreadyExists){
                return res.status(400).json({success:false,message :"User already exists!"});
            }
            const hashedPassword=await bcrypt.hash(password,10);
            const verificationToken=Math.floor(100000+Math.random()*900000).toString();

            const user=new User({
                email,
                role,
                password:hashedPassword,
                name,
                verificationToken,
                verificationTokenExpiresAt:Date.now()+24*60*60*1000
                
            })
await user.save();

//jwt
        generateTokenAndSetCookie(res, user._id);
 await sendVerificationEmail(user.email,verificationToken);
		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
        }catch(error){
            res.status(400).json({success:false,message :error.message})
        }
    
};


export const verifyEmail=async(req,res)=>{
    const{code}=req.body;
    try{
        const user=await User.findOne({verificationToken:code})

        if(!user){
return res.status(400).json({success:false,message:"Invalid or expired verification code"}) 
}
    user.isVerified=true;
    user.verificationToken=undefined;
    user.verificationTokenExpiresAt=undefined;
    await user.save();

   
    

    res.status(200).json({
        success:true,
        message:"Email verifies successfully",
        user:{
            ...user.doc,
            password:undefined,

        },
    });
       
    }catch (error){
        console.log("error in verifying email",error);
        res.status(500).json({success:false,message:"Server error"});
    }
};




export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		generateTokenAndSetCookie(res, user._id);

		user.lastlogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
                role:user.role,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const logout=async(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({success:true,message:"Logged out Successfully"});
}

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("password role");

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};