const mongoose=require('mongoose');
const product = require('./product');
const { model } = require('./user');
const {ObjectId}=mongoose.Schema;  //we want to use product schema's attributes in order
//adding productcart schema
const productcartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    price:Number,
    count:Number
},{timestamps:true});

const orderSchema=new mongoose.Schema({
    products:[productcartSchema],  //products inside cart..which will be having soome other speial properties..like price,qty
    transaction_id:{},
    amount:{
        type:Number
    },
    address:{
        type:String
    },
    status:{
        type:String,
        default:"Recieved",
        enum:["Cancelled","Delivered","Shipped","Processing","Recieved"]
    },
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User",
        required:true
    }   
},{timestamps:true})

const Productcart=mongoose.model("Productcart",productcartSchema)
const Order=mongoose.model("Order",orderSchema);

module.exports={Productcart,Order};