const express=require('express');

const {isSignedin,isAuthenticated,isAdmin}=require('../controllers/auth')
const router=express.Router();

const {getUserById,getUser,updateUser,userPurchaseList}=require('../controllers/user');
router.param("userId",getUserById)//Map the given param placeholder name(s) to the given callback(s).

//for all userId param based routes it will work..i.e getUserById middleware executes and sets user object to req.profile

router.get("/user/:userId",isSignedin,isAuthenticated,getUser);
router.put("/user/:userId",isSignedin,isAuthenticated,updateUser);
router.get("/user/orders/:userId",isSignedin,isAuthenticated,userPurchaseList);
module.exports=router