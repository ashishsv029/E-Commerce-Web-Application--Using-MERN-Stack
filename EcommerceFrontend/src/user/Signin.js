import React,{useState}from 'react'
import Base from '../core/Base'
import {Link,Redirect} from 'react-router-dom'
import {signin,authenticate,isAuthenticated} from "../auth/helper"

const Signin = ()=>{

    const [values,setValues]=useState({

        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect: false

    })

    const {email,password,error,loading,didRedirect}=values
    const {user}=isAuthenticated();

    const handleChange= nametypefromform => event =>{
        setValues({...values,error:false,[nametypefromform]: event.target.value})
    }
    const loadingMessage=()=>{
        return(
            loading &&(
                <div className="alert alert-info">
                    <h2>loading....</h2>
                </div>
            )
        )
    }

    const errorMessage=()=>{
        return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger" style={{display:error? "": "none"}}>
                   {error}
                </div>
            </div>
        </div>)
    }

    const onsubmit=event=>{
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }
            else{
                authenticate(data,()=>{
                    setValues({...values,didRedirect:true})
                })
            }
        })
        .catch(console.log("Signin request failed"))
    }

    const performRedirect=()=>{
        if(didRedirect){
            if(user&& user.role===1){
                return <Redirect to="/admin/dashboard" />
            }
            else{
                return <Redirect to="/user/dashboard" />
            }
        }
       if(isAuthenticated())
            return <Redirect to="/" />
        
    }

    const Signinform=()=>{
        return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    
                    <div className="form-group">
                        <label className="text-light">email</label>
                        <input onChange={handleChange("email")} type="email" value={email} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label className="text-white">Password</label>
                        <input  onChange={handleChange("password")} type="password" value={password} className="form-control"/>
                    </div>
                    <button onClick={onsubmit}  className="btn btn-success btn-block  ">Submit</button>
                </form>
            </div>
        </div>
        )
    }

    return (
        <div>
            <Base title="Login Here" description="Please Login here using your credentials">
                {loadingMessage()}
                {errorMessage()}
               {Signinform()}
               {performRedirect()}
    <p className="text-white text-center">
    {JSON.stringify(values)}
    </p>
            </Base>
        </div>
    )
}

export default Signin