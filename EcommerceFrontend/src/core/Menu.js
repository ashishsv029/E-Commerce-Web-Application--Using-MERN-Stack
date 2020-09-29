import React,{Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {signout,isAuthenticated} from '../auth/helper'
const currentTab=(history,path)=>{
    if(history.location.pathname===path)
    {
        console.log("Inside function")
        console.log(history)
        console.log(history.location)
        return {color: "#45CE30"}
    }
    else
    return {color:"#dd45ff"}
}
//navbar component 
//passing history like props it is empty
//history is an object of browser
//history.location.pathname will be assigned value of to attribute in Link element as soon as u click that link

//again only clicked element wil be highlighted because u will be passing 2 params to curretTab function..i.e history obj
// and path..if u dont click that link history object will not be having any value so it fails and else part executes
//when u click history.location.pathname will be updated to the to value which will be same as path value..so it is colored

const Menu =({history})=>{
    //whatever u write inside {} is a javascript code inside JSX code used by react
    console.log("hist=",history)
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history,'/')} className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,'/cart')} className="nav-link" to="/cart">Cart</Link>
                </li>
                {
                isAuthenticated() && isAuthenticated().user.role===0 && (
                <li className="nav-item">
                    <Link style={currentTab(history,'/user/dashboard')} className="nav-link" to="/user/dashboard">Dashboard</Link>
                </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role===1 && (
                <li className="nav-item">
                    <Link style={currentTab(history,'/admin/dashboard')} className="nav-link" to="/admin/dashboard">Admin</Link>
                </li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                    <li className="nav-item">
                        <Link style={currentTab(history,'/signup')} className="nav-link" to="/signup">SignUp</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link style={currentTab(history,'/signin')} className="nav-link" to="/signin">SignIn</Link>
                    </li>
                    </Fragment>
                )}
                
                <li className="nav-item">
                    {
                    isAuthenticated() && (
                        <span className="nav-link text-warning" onClick={()=>{
                            signout(()=>{
                                history.push("/")
                            })
                        }}>
                            Signout
                        </span>
                    )
                    }
                </li>
            </ul>
            
        </div>
    )
}

//by wrapping the component inside the withRouter,the component will be provided with browser objects like history etc 
//as props..thats why we wrote  history to access the history prop which is sent by this withRouter
export default withRouter(Menu)
