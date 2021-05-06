import React,{useEffect} from 'react'
import Home from '../Home/Home'
import './Contact.css'
import Aos from 'aos'
import "aos/dist/aos.css"
const Contact = () => {
    useEffect(() => {
        Aos.init({duration: 2000});
      }, [])
    return (
        <div>
            <Home/>
            <div  data-Aos="fade-up" className="Text8">

         
            <h1 data-Aos="fade-up">We 'd love to hear from you !</h1>
            </div>
            <div data-Aos="fade-right" className="Text8d">
            <p data-Aos="fade-left">Tell us how we can help and we'ill get in touch shortly</p>
           <b><h4 data-Aos="fade-right">admin@domain.com</h4></b> 
            </div>
           
            
        </div>
    )
}

export default Contact
