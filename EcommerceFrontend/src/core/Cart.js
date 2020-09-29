import React ,{useState,useEffect}from 'react'
import "../styles.css"
import {API} from '../backend'
import Base from './Base'
import Card from "./Card"
import {getProducts} from './helper/coreapicalls'
import {loadCart} from './helper/Carthelper'
import Stripecheckout from './Stripecheckout'
import Paymentb from "./Paymentb"
const Cart=()=>{
    const [products,setProducts]=useState([])
    const [reload,setReload]=useState(false) //refreshing the page after any modifications
    useEffect(() => {
      setProducts(loadCart())
    }, [reload])
    const loadAllProducts=(products)=>{
        return (
            <div>
                <h2>
                    {products.map((product,index)=>{
                       return <Card key={index} product={product} addtoCart={false} removeFromCart={true} setReload={setReload} reload={reload}/>
                    })}
                </h2>
            </div>
        )
    }
    const loadCheckout=()=>{
        return (
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )
    }
    
    return (
        <Base title="Your Cart" description="Cart page of Tshirt Store">
            <div className="row text-center"> 
            <div className="col-md-6 col-sm-12">
                {/*<Stripecheckout products={products} setReload={setReload}/>*/}
                <Paymentb products={products}  setReload={setReload}/>
                </div>
                <div className="col-md-6 col-sm-12">
                {products.length>0?loadAllProducts(products):(<h3>No products in cart</h3>)
                }
                </div>
               
            </div>
        </Base>
    )
}
export default  Cart