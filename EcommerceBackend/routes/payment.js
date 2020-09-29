const express=require('express');
const router=express.Router();
const {isSignedin,isAuthenticated}=require("../controllers/auth")
const {getToken,processPayment}=require("../controllers/payment")
const {getUserById}=require("../controllers/user")
router.param("userId",getUserById)

router.get("/payment/gettoken/:userId",isSignedin,isAuthenticated,getToken);
router.post("/payment/braintree/:userId",isSignedin,isAuthenticated,processPayment)

module.exports=router;
