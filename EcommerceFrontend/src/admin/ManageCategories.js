import React , {useState ,useEffect} from 'react'
import Base from '../core/Base'
import {getCategories} from './helper/adminapicall'
import {Link} from 'react-router-dom'
const ManageCategories=()=>{


    const [values, setValues] = useState({
        categories:[],
        error:"",
        loading:false

    })
    const {categories,error,loading}=values

    const loadCategories=()=>{
        console.log("hellllloooo")
        setValues({...values,loading:true})
        getCategories()
        .then(
            res=>{
                console.log("res=",res)
                if(res.error)
                    setValues({...values,error:res.error,loading:false})
                else{
                    console.log("categories before=",categories)
                    setValues({...values,error:res.error,categories:res.cat,loading:false})
                    console.log("categories=",categories)
                }
            })
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const deleteThisProduct=(id)=>{
        
    }

    return (
        <Base title="Update Categories" description="Update the tshirt categories here">
            <h2 className="mb-4">All Categories:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}><span>Admin Home</span></Link>
            <div className="row">
            <div className="col-12">
            <h2 className="text-center text-white my-3">Total {categories.length} categories are available</h2>
              {categories.map((cat, index) => {
                return (
                  <div key={index} className="row text-center mb-2 ">
                    <div className="col-4">
                      <h3 className="text-white text-left">{cat.name}</h3>
                    </div>
                    <div className="col-4">
                      <Link className="btn btn-success" to={`/admin/product/update/${cat._id}`}>
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-4"> 
                    {/* u should write like this i.e inClick=deleteThisProduct..without braces or like shown
                    below..i.e inside a callback*/}
                      <button onClick={() => {deleteThisProduct(product._id);}} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
            
        </Base>
    )
}
export default ManageCategories