import React ,{useState,useEffect} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import {getCategories,getaProduct,updateaProduct} from './helper/adminapicall'
import {isAuthenticated} from '../auth/helper/index'
const UpdateProduct=({match})=>{

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
      
        const preload=(productId)=>{
            
            getaProduct(productId).then(data=>{
               //console.log(res.cat)
                if(data.error){
                setValues({...values,error:data.error});
                }
                else{
                 preloadCategories();
                setValues({...values,
                            name:data.name,
                            description:data.description,
                            price:data.price,
                            category:data.category._id,
                            stock:data.stock,
                            formData: new FormData()});
                        
                //console.log(categories)
                }
            })
        }
        const preloadCategories=()=>{
            getCategories().then(data=>{
                if(data.error)
                setValues({...values,error:data.error});
                else{
                    preloadCategories();
                    setValues({
                        categories:data.cat,formData: new FormData()
                    })
                }
            })
        }
        useEffect(() => {
            preload(match.params.productId);
        }, [])

        const successMessage=()=>{
            return(
            <div className="alert alert-success mt-3"
            style={{display:createdProduct?"":"none"}}>
                <h4>{createdProduct} updated successfully</h4>
            </div>)
        }
        
        const errorMessage=()=>{
            return(
                <div className="alert alert-danger mt-3"
                style={{display:error?"":"none"}}>
                    <h4>{error}</h4>
                </div>)
        }
        const loadingMessage=()=>{
            return(
                <div className="alert alert-info mt-3"
                style={{display:loading?"":"none"}}>
                    <h4>Loading...</h4>
                </div>)
        }

        const onSubmit = (event) => {
            event.preventDefault();
            setValues({...values,error:"",loading:true,getRedirect:true})
            console.log(formData)
            updateaProduct(match.params.productId,user._id,token,formData).then(data=>{
                console.log(data)
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
                                getRedirect:false
                                })
                }
                setTimeout(()=>{
                    console.log(getRedirect)
                },20000)
                
                
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
                onChange={handleChange("name")}
                name="photo"
                className="form-control"
                placeholder="Name"
                value={name}
              />
            </div>
            <div className="form-group">
              <textarea
                onChange={handleChange("description")}
                name="photo"
                className="form-control"
                placeholder="Description"
                value={description}
              />
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("price")}
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
              />
            </div>
            <div className="form-group">
              <select
                onChange={handleChange("category")}
                className="form-control"
                placeholder="Category"
              >
                <option>Select</option>
                
                {categories && 
                categories.map((cate,index)=>{
                return <option key={index} value={cate._id}>{cate.name}</option>
                })}
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
              Update Product
            </button>
          </form>
        );
      
        
      
      
      



    return (
        <Base title="Update Product" description="Update product info,here" className="container bg-dark p-4">

        <Link to="/admin/dashboard" className="btn btn-md btn-success text-dark mb-3 rounded">Admin Home</Link>

        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {loadingMessage()}
                {createProductForm()}
            </div>
        </div>
        </Base>
    )
}


export default UpdateProduct
