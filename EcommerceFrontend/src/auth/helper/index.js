import {API} from '../../backend'

//

export const signup= user=>{
    return fetch(`${API}/signup`,{
        method: "POST",
        headers: {
            Accept : "application/json",
            "Content-Type" :"application/json"
        },
        body: JSON.stringify(user) //user  is a json object
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=> console.log(err))
}
export const signin= user=>{
    return fetch(`${API}/signin`,{
        method: "POST",
        headers: {
            Accept : "application/json",
            "Content-Type" :"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=> console.log(err))
};


//middleware that is triggered while u are signing in..after sign in u will have a token generated..
//this token will be stored inside the  

//here data will be {token,user:{_id,name}}
export const authenticate = (data,next) =>{
    if(typeof window!=='undefined'){
        localStorage.setItem("jwt",JSON.stringify(data))//storing data that u got in local storage..it has token+user id and name
        next();
    }
}


export const signout= next=>{
    if(typeof window!=='undefined'){
        localStorage.removeItem("jwt")
        next();
        return fetch(`${API}/signout`,{
            method:"GET"
        })
        .then(response=> console.log("signout successfully"))
        .catch(err=>console.log(err))
    }
}


//utility function to check whether u are authenticated or not
export const isAuthenticated=()=>{
    //this is a check to see if the script is being run in a web page inside web browser
    if(typeof window=="undefined")
        return false;
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt")); //converts a string to JSON object
    }else{
        return false;
    }

}