const express=require('express')
const router=express.Router()
const {isSignedin,isAuthenticated,isAdmin}=require('../controllers/auth')
const {getUserById,pushOrderInPurchaseList}=require('../controllers/user')
const {updateStock}= require('../controllers/product')
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus}=require('../controllers/order')

router.param("userId",getUserById)
router.param("orderId",getOrderById)

router.post("/order/create/:userId",isSignedin,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)
//router.post("/order/create/:userId",isSignedin,isAuthenticated,pushOrderInPurchaseList,createOrder)
router.get("/order/all/:userId",isSignedin,isAuthenticated,isAdmin,getAllOrders)
router.get("/order/status/:userId",isSignedin,isAuthenticated,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedin,isAuthenticated,isAdmin,updateStatus);
router.get("/order/:orderId",(req,res)=>console.log("AYYINDHIIII"))

module.exports=router