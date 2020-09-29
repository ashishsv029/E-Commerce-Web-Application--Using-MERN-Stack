import React,{useState,useEffect} from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart,removeItemFromCart } from "./helper/Carthelper";
import {Redirect} from 'react-router-dom'


const Card = ({ product,addtoCart=true,removeFromCart=false,setReload= f=>{console.log("reloads here");return f}, reload=undefined}) => {
    const [redirect,setRedirect]=useState(false)

    //redirect is initially set to false 

    //const [count,setCount]=useState(product.count)

    const cardTitle=product ? product.name :"product"
    const cardDescription = product?product.description:"product description"
    const cardPrice=product? product.price:"product price"

    const addToCart=()=>{
        addItemToCart(product,()=>{
            setRedirect(true) //once any item is clicked add to cart..so redirect=true
        })
    }

    const getaRedirect=(redirect)=>{
      console.log("get a redirect=",redirect)
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

//conditional rendering of buttons based on propvalues addtocart and removefromcart

const showAddToCard=(addtoCart)=>{
    return(
        addtoCart && (
            <button onClick={addToCart} className="btn btn-block btn-outline-success mt-2 mb-2">Add to Cart</button>
        )
    )
}

const showRemoveFromCart=(removeFromCart)=>{
return removeFromCart&&(
    <button onClick={() => {removeItemFromCart(product._id);setReload(!reload)}}
    className="btn btn-block btn-outline-danger mt-2 mb-2">Remove from cart</button>
  )
}

return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
         
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">{cardDescription}</p>
        <p className="btn btn-success rounded  btn-sm px-4"> $ {cardPrice} </p>
        <div className="row">
          <div className="col-12">
            {showAddToCard(addtoCart)}
          </div>
          <div className="col-12">
            {showRemoveFromCart(removeFromCart)}
          </div>
          {getaRedirect(redirect)}
        </div>
      </div>
    </div>
  );
};

export default Card;
