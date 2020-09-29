var express=require('express');
var router=express.Router();
const {check,validationResult}=require('express-validator');
const {signin,signup,signout,isSignedin}=require('../controllers/auth')

router.post("/signin",/*this is  a validation*/ [
    check("email","email is required").isLength({min:3}),
    check("password","password is required").isLength({min:1}) //atleast 1 letter should be entered
],signin)

router.post("/signup",[
    check("name","name should be atleast 3 characters").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be atleast 3 chars").isLength({min:3})
],signup); //we can also use validators based on some 

router.get("/signout",signout);

router.get("/testing",isSignedin,(req,res)=>{
    res.json(req.auth) //we will be getting this property from the expressJWT function where we wrote userProperty is auth
})                     //it will return us the userid stored in db along with iat timestamp
module.exports=router;

