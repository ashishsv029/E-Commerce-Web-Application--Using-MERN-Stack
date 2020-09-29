const User= require("../models/user")
const {check,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const expressJwt=require('express-jwt');
const secretkey=require("../config/keys").Secret;

const signup=(req,res)=>{

    //if u get any errors during validation .. u can manage here
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            //the below code shows the first error only
            //to see all errors.use error:errors.array() alone
            error:errors.array()[0].msg,
            parameters: errors.array()[0].param //see docs for other fields that u can tweak while handling errors
        })
    }
    const user=new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"User not saved in DB"
            })
        }
        res.json(user)
    })
}

const signin=(req,res)=>{
    const {email,password}=req.body;  //destructuring of data
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            //the below code shows the first error only
            //to see all errors.use error:errors.array() alone
            error:errors.array()[0].msg,
            parameters: errors.array()[0].param //see docs for other fields that u can tweak while handling errors
        })
    }
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({error: "User doesnt exists..please register"})
        }
        if(!user.authenticate(password)) //if user's pwd is incorrect
        {
            return res.status(401).json({error:" email and password doesnt matched"})
        }
        
        //if everything is correct..signin the user i.e create a token and strore it in  browser
        const token=jwt.sign({_id:user._id},secretkey)

        //put the token inside cookie
        res.cookie("token",token,{expire: new Date()+1000})

        //return the response to frontend;
        const {_id,name,email,role}=user
        res.json({token,user:{_id,name,email,role}})
    })
    
}

const signout=(req,res)=>{
    //clear cookies.boom u will be signed out

    res.clearCookie("token")  
    res.json({//we can also throw even a JSON
        message:"Signed Out successfully"
    })
}

const isSignedin = expressJwt({  //THIS IS A MIDDLEWARE..here while passing the token in header Bearer must be must
    secret:secretkey,
    userProperty:"auth"  //any name u can give here..just a name for authentication
})

//CUSTOM MIDDLEWARE

const isAdmin= (req,res,next)=>{
    if(req.profile.role===0) //req.profile is set using frontend
    {
        return res.status(403).json({
            error:"Access Denied since you are not an admin"
        })
    }
    next();
}

const isAuthenticated=(req,res,next)=>{
    if(!(req.auth && req.profile && req.profile._id==req.auth._id)) //if u are signedin then both ids match
    {
        return res.status(403).json({
            error:"Access Denied.please signin first rey"
        })
    }
    next();
}

module.exports={signin,signup,signout,isSignedin,isAuthenticated,isAdmin}