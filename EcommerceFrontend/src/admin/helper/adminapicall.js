import {API} from '../../backend'

export const createCategory=(userId,token,category
)=>{
    console.log("category is")
    return fetch(`${API}/category/create/${userId}`,{
        
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(res=>{
        return res.json()
    })
    .catch(
        err=>console.log(err)
    )
}

//get all categories

export const getCategories=()=>{
    return fetch(`${API}/categories`,{   
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}



//products calls
//the product will be not like json/string format
export const createaProduct=(userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    }).then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

//get all products


export const getProducts=()=>{
    return fetch(`${API}/products`,{   
        method:"GET"

    }).then(res=>{
        return res.json()
    }).catch(err=>console.log(err))
}

//get a product

export const getaProduct=(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET",
    }).then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}


//update a product
export const updateaProduct=(productId,userId,token,product)=>{
    console.log("p=",product)
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    }).then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}


//delete a product
export const deleteaProduct=(productId,userId,token)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
        
    }).then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}