import React from 'react'
import Home from '../Home/Home'
const Login = () => {
    return (
        <div>
              <div>
            <Home/>
            <div  data-Aos="fade-up"  className="SingUp">
            <h1  data-Aos="fade-up" >Sing Up</h1>
            <div  data-Aos="fade-up" >
                <div  data-Aos="fade-up"  className="Singup05">
            <p  data-Aos="fade-up" >Alraedy have an account  ?</p>
            <h3  data-Aos="fade-up" >Sing in here</h3>
            </div >
            </div>
            <div  data-Aos="fade-up"  className="Inputdd">

           
            <div  data-Aos="fade-up"  className="Inputd">
               
            <input  data-Aos="fade-up"  placeholder="Email"/>
            <img  data-Aos="fade-up"  src="Email.png"/>
            </div>
              
            <div   data-Aos="fade-up" className="Inputd">
              
            <input  data-Aos="fade-up"  placeholder="Password"/>
            <img  data-Aos="fade-up"  src="Password.png"/>
            </div>
           
            </div>
            <div data-Aos="fade-up"  className="Signup">
                <button  data-Aos="fade-up" >
                    Sign up
                </button>
            </div>
            <div  data-Aos="fade-up"  className="TextBYClick">
                <p>By clicking this button you 
                    agree to our Privecy Policy & Terms of Use</p>
            </div>
            </div>

           
        </div>
        </div>
    )
}

export default Login
