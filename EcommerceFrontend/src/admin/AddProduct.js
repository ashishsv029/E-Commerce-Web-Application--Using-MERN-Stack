import React ,{useState,useEffect} from 'react'
import Base from '../core/Base'
import {Link,Redirect} from 'react-router-dom'
import {getCategories,createaProduct} from './helper/adminapicall'
import {isAuthenticated} from '../auth/helper/index'
const AddProduct=({history})=>{

        const {user,token} =isAuthenticated();
        //state for this product
        const [values, setValues] = useState({
          name: "",
          description: "",
          price: "",
          stock: "",
          photo:"",
          categories:[],
          category:"",
          loading:false,
          error:"",
          createdProduct:"",
          getRedirect:false,
          formData:""
        });
        
        //destructuring the state variables to make them directly available for the form elements
        const { name, description, price, stock,categories,category,
        loading,error,createdProduct,getRedirect,formData } = values;
      
        const preload=()=>{
            console.log("preload")
            getCategories().then(res=>{
               //console.log(res.cat)
                if(res.error){
                setValues({...values,error:res.error});
                }
                else{
                setValues({...values,categories:res.cat,formData:new FormData()});
                //console.log(categories)
                }
            })
        }

        useEffect(() => {
            preload(); //this will load all categories whenever any component is loaded or updated in ui
        }, [])

        const successMessage=()=>{
            return(
            <div className="alert alert-success mt-3"  style={{display:createdProduct?"":"none"}}>
                <h4>{createdProduct} created successfully</h4>
            </div>)
        }
        
        const errorMessage=()=>{
            return(
                <div className="alert alert-danger mt-3"
                style={{display:error?"":"none"}}>
                    <h4>{error} occurred!!!</h4>
                </div>)
        }
        const loadingMessage=()=>{
            return(
                <div className="alert alert-info mt-3"
                style={{display:loading?"":"none"}}>
                    <h4>Loading...</h4>
                </div>)
        }
        const redirecting=()=>{

          //ASSIGNMENT
          if(getRedirect)
          {
            setTimeout(()=>{
              //return <Redirect to="/admin/dashboard" /> //It wont work because redirect is a component so wont work inside a function
              history.push('/admin/dashboard')
            },2000)
            
          }
        }
        const onSubmit = (event) => {
            event.preventDefault();
            setValues({...values,error:"",loading:true,getRedirect:false})
            createaProduct(user._id,token,formData).then(data=>{
                
                if(data.error){
                    setValues({...values,error:data.error,getRedirect:false})
                    //console.log("inside=",getRedirect)
                }else{
                    setValues({...values,
                                name:"",
                                description:"",
                                price:"",
                                photo:"",
                                stock:"",
                                loading:false,
                                createdProduct:data.name,
                                getRedirect:true
                                })
                }
                
                
                
            })

          
        };


      //higher order function
        const handleChange = name => event => {
          //
          const value=name==="photo" ? event.target.files[0]:event.target.value
          formData.set(name,value);
          setValues({...values,[name]:value})



        };
      
        const createProductForm = () => (
          <form>
            <span>Post photo</span>
            <div className="form-group">
              <label className="btn btn-block btn-success">
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  name="photo"
                  accept="image"
                  placeholder="choose a file"
                />
              </label>
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("name")} name="photo" className="form-control" placeholder="Name"
                value={name}
              />
            </div>
            <div className="form-group">
              <textarea
                onChange={handleChange("description")} name="photo" className="form-control" placeholder="Description"
                value={description}
              />
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("price")} type="number" className="form-control" placeholder="Price"
                value={price}
              />
            </div>
            <div className="form-group">
              <select onChange={handleChange("category")} className="form-control" placeholder="Category"
              >
                <option>Select</option>
                {
                  categories && 
                  categories.map((cate,index)=>{
                  return <option key={index} value={cate._id}>{cate.name}</option>
                }
                )}
              </select>
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("stock")}
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={stock}
              />
            </div>
      
            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-outline-success mb-3"
            >
              Create Product
            </button>
          </form>
        );
      
        
      
      
      



    return (
        <Base title="Add Product" description="Add new product into the store,here" className="container bg-dark p-4">

        <Link to="/admin/dashboard" className="btn btn-md btn-success text-dark mb-3 rounded">Admin Home</Link>

        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {loadingMessage()}
                {createProductForm()}
                {redirecting()}
            </div>
        </div>
        </Base>
    )
}


export default AddProduct
