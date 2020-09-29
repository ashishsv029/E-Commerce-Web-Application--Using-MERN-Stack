import React from 'react'
import Menu from './Menu'
import '../styles.css'
//all the divs wrapped under this Base boilerplat will appear at {children} div with that div styling
const Base = ({    //these are the parameters that will be applied to its enclosing classes or child classes
    title="My Title",
    description="My description",
    className="bg-dark text-white p-4",
    children
})=>{
    return (
        <div>
            <Menu />
            <div className="container"> {/* in this div only our UI components will be loaded */}
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title} </h2>
                    <p className="lead"> {description} </p>
                </div>
                <div className={className}>
                    {children} {/* here the component will be loaded which is a child to this component */}
                </div> 
            </div>
            <br/><br/><br/><br/><br/>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4 className="lead"> Feel free to reach out us,if u have any queries</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">Created by #ishInnovations</span>
                </div>

            </footer>
        </div>
    )
}
export default Base