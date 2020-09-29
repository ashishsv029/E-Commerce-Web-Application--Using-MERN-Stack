export const addItemToCart=(item,next)=>{

    let cart=[] //cart items will be stored in local storage so that it persists even if u switch to other option meanwhile
    if(typeof window!=="undefined")
    {
        if(localStorage.getItem("cart"))//if any item is already available in cart stored in local storage add the current
        cart=JSON.parse(localStorage.getItem("cart")) //item to the existing cart 
        
            cart.push({
                ...item,
            })
        
        localStorage.setItem("cart",JSON.stringify(cart)) //updated card
        next();
    }
    
}

export const loadCart=()=>{
    if(typeof window!=="undefined")
    {
        if(localStorage.getItem("cart"))
        {
            return JSON.parse(localStorage.getItem("cart"))
            
        }
        
    }
    
}


export const removeItemFromCart=(productId)=>{
    let cart=[]
    if(typeof window!=="undefined")
    {
        if(localStorage.getItem("cart"))
        cart=JSON.parse(localStorage.getItem("cart"))
        cart.map((product,i)=>{
            if(product._id==productId)
            {
                cart.splice(i,1)
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart))
    }
    return cart;
}

export const cartEmpty=next=>{
    if(typeof window!==undefined){
        console.log("coming")
        
        localStorage.removeItem("cart")
        let cart=[];
        localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
}