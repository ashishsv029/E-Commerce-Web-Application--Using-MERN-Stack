import React,{useState,useEffect} from 'react'
import {isAuthenticated} from "../auth/helper"
import {cartEmpty,LoadCart} from "./helper/Carthelper"
import {Link} from "react-router-dom"

const Stripecheckout=({products,setReload=f=>f,reload=undefined})=> {
    const [data,setData]=useState({
        loading:false,
        success:false,
        error:"",
        address:""
    });

    const token=isAuthenticated()&&isAuthenticated().token
    const userId=isAuthenticated()&&isAuthenticated().user._id
    const getFinalPrice=()=>{
        let amount=0
        products.map(p=>{
            amount=amount+p.price
        })
        return amount
       };
    
    
    const showStripeButton=()=>{
        return isAuthenticated()?(
            <button className="btn btn-info">Pay with Stripe</button>
        ):( <Link to="/signin"><button className="btn btn-warning">Signin</button></Link>)
    }
    return (
        <div>
            <h1 className="text-white">Stripe Billing Info :- {getFinalPrice()}</h1>
            {showStripeButton()}
        </div>
    )
}

export default Stripecheckout