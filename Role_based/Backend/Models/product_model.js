import mongoose from 'mongoose';

const productSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    category:{
        type:String,
    },
    price:{
        type:Number,required:true
    },
    image:String,
})

const Products=mongoose.model("Product",productSchema);
module.exports=Products