const User= require("../models/user");
const Order=require("../models/order");
//const { UnauthorizedError } = require("express-jwt");

const getUserById=(req,res,next,id)=>{
    //console.log("SOMETHING IS FISHY")
    User.findById(id,(err,user)=>{
        if(err||!user){
        return res.status(400).json({error:"User Not found in DB"});}
        req.profile=user;
        next()
    })
}


const getUser=(req,res)=>{
    //req.profile displays all the schema details  of user
    //but we dont want to display sensitive information
    req.profile.salt=undefined
    req.profile.encrypt_password=undefined
    req.profile.createdAt=undefined
    req.profile.updatedAt=undefined
    return res.json(req.profile)
}


const getAllUsers=(req,res)=>{
    User.find({},(err,user)=>{
        if(err||!user) return res.status(400).json({error:"Users not found"})
        res.json({users:user});
    })
}


const updateUser=(req,res)=>{
    User.findByIdAndUpdate({_id:req.profile._id},{$set:req.body},{new:true,useFindAndModify:false},(err,user)=>{
        if(err || !user)return res.status(400).json({error:"you are not authorized to do update"})
        user.salt=undefined;
        user.encrypt_password=undefined; //dont show such sensitive information
        res.json({user})
    })
}

const userPurchaseList=(req,res)=>{
        //there is a method called populate in mongo which is used when there is reference of another schema
        Order.find({user:req.profile._id})
        .populate("user","_id name email",(err,order)=>{
            if(err||!order) return res.status(400).json({error:"No orders made through this account"});
            res.json({order})
        }) //here we are populating user field in order schema with id,name,email
}

const pushOrderInPurchaseList=(req,res,next)=>{
    let purchases=[];
    req.body.order.products.forEach(product => {
        //console.log("pi=",product)
        purchases.push({
            _id:product._id,
            name:product.name,
            category:product.category,
            description:product.description,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        })
        next();
    });

    //store in db
    User.findOneAndUpdate({_id:req.profile._id},{$push:{purchases:purchases}},{new:true}, //new says return the updated obj
        (err,user)=>{
            if(err||!user) return res.status(400).json({error:"Unable to save purchase list"})
            next();
        })
    
}

module.exports={getUserById,getUser,updateUser,userPurchaseList,pushOrderInPurchaseList}