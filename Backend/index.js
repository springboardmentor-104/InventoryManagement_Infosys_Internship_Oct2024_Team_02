import express from 'express';
import{connectdb}from "./db/connectdb.js";
import dotenv from 'dotenv';
import cors from "cors";
import authRoutes from "./routes/auth.js";
import cookieParser from 'cookie-parser';
dotenv.config();



const app=express();
const PORT=process.env.PORT||5000;

app.use(cors({origin:"http://localhost:5173",credentials:true}));

app.use(express.json()); //allows us to parse incoming requests :req body
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

app.use("/api/auth",authRoutes);



app.listen(5000,()=>{
    connectdb();
    console.log("Server is running on port:",PORT);
});

