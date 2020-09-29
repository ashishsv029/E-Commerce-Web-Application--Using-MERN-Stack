import React ,{useState} from 'react'
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper"
import {Link} from "react-router-dom"
import {createCategory} from "./helper/adminapicall"


const AddCategory= ()=> {

    const [name,setName]=useState()
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)
    const {user,token}=isAuthenticated();

    const goBack=()=>{
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard"> Admin Home</Link>
            </div>
        )
    }
    

    const handleChange=(event)=>{
        setError("")
        setName(event.target.value)
    }

    const successMessage=()=>{
       
        if(success){
            return(
            <div className="row">
                <div className="col-md-12  text-left">
                    <div className="alert alert-success" >
                        <h4 className="text-success">Category created Successfully</h4>
                    </div>
                </div>
            </div>
            )
        }
    }

    const errorMessage=()=>{
        if(error){
            return(
                <div className="row">
            <div className="col-md-12  text-left">
        <div className="alert alert-danger" >
            <h4 className="text-danger">Error while creating category</h4>
        </div>
        </div>
        </div>
            ) 
        }
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        setError("")
        setSuccess(false)
        //backend request is made
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error)
                setError(true)
            else{
                setError("");
                setSuccess(true);
                setName("")
            }
        })
    }
    
    const myCategoryForm=()=>{
        return (
        <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input type="text" className="form-control my-3" autoFocus required placeholder="For Ex.Summer" onChange={handleChange} value={name}/>
                <button onClick={onSubmit} className="btn btn-outline-success btn-lg">Create Category</button>
            </div>
        </form>
        )
    }



    return (
        <Base title="Add Category" description="Add a new category for new tshirts"
            className="container bg-success p-4">
            <div className="row bg-white rounded">
                <div className="col-md-6 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
        
    )
}

export default AddCategory
