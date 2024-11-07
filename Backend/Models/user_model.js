import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true
      },
      name:{
        type:String,
        required:true
      },
      lastlogin:{
        type:Date,
        default:Date.now
      },
      isVerified:{
        type:Boolean,
        default:false
      },
      role:{
        type:String,
        enum:['Customer','Admin'],
        default:'Customer'
      },
      resetPasswordToken:String,
      resetPasswordExpiresAt:Date,
      verificationToken:String,
      verificationTokenExpiresAt:Date,
},{timestamp:true});



export const User=mongoose.model('User',userSchema);