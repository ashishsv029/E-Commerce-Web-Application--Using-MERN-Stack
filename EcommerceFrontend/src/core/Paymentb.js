import React,{useState,useEffect} from 'react'
import { loadCart, cartEmpty } from './helper/Carthelper'
import { Link } from 'react-router-dom'
import { getmeToken,processPayment} from './helper/Paymenthelper'
import { createOrder } from './helper/Orderhelper'
import { isAuthenticated } from '../auth/helper'
import DropIn from 'braintree-web-drop-in-react'



const Paymentb=({products,setReload=f=>f,reload=undefined})=> {
    const[info,setInfo]=useState({
        loading:false,
        success:false,
        clientToken:null,
        error:"",
        instance:{}

    })

    const userId=isAuthenticated() && isAuthenticated().user._id
    const token=isAuthenticated() && isAuthenticated().token


    const showbtdropIn=()=>{
        return (
            <div>
                {/*<h1> welcome {info.clientToken}</h1>*/}
                {info.clientToken!==null&& products.length>0 ?(
                    <div>
                        
                        <DropIn

                        options={{authorization: info.clientToken}}
                        onInstance={instance=>(info.instance=instance)}
                        
                        />
                        <button className="btn btn-block btn-success" onClick={onPurchase}>Buy</button>

                    
                    </div>
                ):(
                    <h1>please login or add items to cart</h1>
                )}
            </div>

        )
    }

    const getToken=(userId,token)=>{
        getmeToken(userId,token).then(info=>{
            console.log("INFORMATION=",info)
            if(info.error){
                setInfo({...info,error:info.error})
            }else{
                const clientToken=info.clientToken
                console.log(clientToken)
                setInfo({clientToken})
            }
        })

    }

    useEffect(() => {
     getToken(userId,token)  
    }, [])


    const onPurchase=()=>{
        setInfo({loading:true})
        let nonce;
        let getNonce=info.instance
        .requestPaymentMethod()
        .then(data=>{
            nonce=data.nonce
            const paymentData={
                paymentMethodNonce:nonce,
                amount:getAmount()
            };
            processPayment(userId,token,paymentData)
            .then(response=>{
                setInfo({...info,success:response.success,loading:false})
                console.log("payment success")
                const orderData={
                    products:products,
                    transaction_id: response.transaction_id,
                    amount:response.transaction.amount

                }
                createOrder(userId,token,orderData)
                //TODO EMPTY THE CART
                cartEmpty(()=>{
                    console.log("Did we got a crash?")
                })
                //force Reload
                setReload(!reload)
            })
            .catch(error=>{
                setInfo({loading : false,success:false});
                console.log("PAYMENT FAILED")
            })
        })
    }
    const getAmount=()=>{
        let amount=0
        products.map(p=>{
            amount=amount+p.price
        })
        return amount
    }
    return (
        <div>
            <h3>Total Bill= $ {getAmount()}</h3>
            {showbtdropIn()}
        </div>
    )
}

export default Paymentb
