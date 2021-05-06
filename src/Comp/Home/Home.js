import React,{useEffect} from 'react'
import './Home.css'
import Aos from 'aos'
import "aos/dist/aos.css"
import {Link} from 'react-router-dom'
const Home = () => {
    useEffect(() => {
        Aos.init({duration: 2000});
      }, [])
    return (
        <div  data-Aos="fade-up" className="Borde">
            <div data-Aos="fade-up"className="HomePageFlexBox">
           <Link tp="/"> <h1  data-Aos="fade-up">KoiRank.com</h1></Link>
            <div  data-Aos="fade-up" className="ContactUs">
            <Link to="/contact">  <p  data-Aos="fade-up">Contact Us</p>  </Link>  
            </div>
            <div  data-Aos="fade-up" className="SignButton">
              <Link to="/login">  <p  data-Aos="fade-right">Sign up</p> </Link>
                <Link to="/SingUp"><button  data-Aos="fade-right">Sing up for free</button></Link>
            </div>
            </div>
        </div>
    )
}

export default Home
