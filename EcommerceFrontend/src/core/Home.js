import React ,{useState,useEffect} from 'react'
import "../styles.css"
import {API} from '../backend'
import Base from './Base'
import Card from "./Card"
import {getProducts} from './helper/coreapicalls'
export default function Home() {
    const [products,setProducts]=useState([]) //iniitially products is an empty array
    const [error,setError]=useState(false)
    const loadAllProduct=()=>{
        getProducts().then(data=>{
            if(data.error){setError(data.error)}
                setProducts(data)
            
        })
    }

    //it will run whenever u render the component for 1st time or update the component or unmount the component
    useEffect(()=>{ //equivalent to componentDidMount ,componentDidUpdate and componentWillUnmount
        loadAllProduct();
    },[])
    
    return (

        <Base title="Welcome!!! Nag Ashish S V" description="Home page of Tshirt Store">
            <div className="row text-center"> 
                <h1 className="text-white">Available Tshirts</h1>
                <div className="row">
                 
                    {products.map((product,index)=>{
                        return(
                            
                            <div key={index} className="col-md-4 col-sm-12 mb-4">
                                <Card product={product} />
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </Base>
    )
}
