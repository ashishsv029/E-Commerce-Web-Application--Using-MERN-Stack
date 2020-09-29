import React ,{useState} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import { signup } from '../auth/helper';

const Signup = ()=>{
    //writing state for the component

    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    }); //useState returns values and setValues
    //if u dont include this statement..u need to write values .email , values.name ... etc while using them
    const {name,email,password,error,success}=values

    //event handler function which updated state using setValues

    //function inside a function i.e higher order functions in JS
    const handleChange= nametypefromform => event =>{
        setValues({...values,error:false,[nametypefromform]: event.target.value}) //updating the statevalues
    }

    const onSubmit=event =>{
        event.preventDefault() //actually when u click submit it takes u to some action..to avoid that we are doing this..so that we can handle our job
        setValues({...values,error:false}) //updating state
        signup({name,email,password})  //
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }else{//resetting the state to empty fields after successful signup
                setValues({...values,
                name:"",
                email:"",
                password:"",
                error:"",
                success:true})
            }
        })
        .catch(console.log("error in signup"))

    }

    const Signupform=()=>{
        return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-white">Name</label>
                        <input type="text" className="form-control" onChange={handleChange("name")} value={name}/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">email</label>
                        <input type="email" className="form-control" onChange={handleChange("email")} value={email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white">Password</label>
                        <input type="password" className="form-control" onChange={handleChange("password")} value={password} />
                    </div>
                    <button type="submit"  className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
                </form>
            </div>
        </div>
        )
    }

    const successMessage=()=>{ //initially success is false so this component wont be displayed until it is changed to true
        console.log("dmd")
        return(
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-success" style={{display:success? "": "none"}}>
                    Registered successfully!!! Please <Link to="/signin">Login Here</Link>
            </div>
        </div>
        </div>)
    }

    const errorMessage=()=>{ //initially error msg is empty so this will not be shown untill some value is set to it
        return(
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-danger" style={{display:error? "": "none"}}>
               {error}  {/*showing the error value which is set in state */}
            </div>
        </div>
        </div>)
    }

    //here inside {}  i used () that means i want to execute that function thereitself..whereas above if u see at onSubmit i didnt wrote() because
    //there i am waiting for an event to be occur then only that call firesup
    return (
        <div>
            <Base title="Register Here" description="Enter the below details for signing up successfully">
                {successMessage()}
                {errorMessage()}
                {Signupform()}  
              <p className="text-white text-center">
                  {JSON.stringify(values)}
              </p>{/*just showing the state vals on screen */}
               
            </Base>
        </div>
    )
}

export default Signup