import React,{useEffect} from 'react'
import './Main.css'
import Aos from 'aos'
import "aos/dist/aos.css"
const Main = () => {
    useEffect(() => {
        Aos.init({duration: 2000});
      }, [])
    return (
        <div>
            <div  data-Aos="fade-up" className="Text01">
                <h3 data-Aos="fade-right" >Powerful Keyword </h3>
            </div>
            <div  data-Aos="fade-up" className="Text02">
                <h3 data-Aos="fade-left" >Rank Tracker. </h3>
            </div>
            <div  data-Aos="fade-up" className="Text03">
                <h3 data-Aos="fade-right" >Completely Free . </h3>
            </div>
            <div  data-Aos="fade-up" className="BackGroundTest">
                 
            </div>
            <div data-Aos="fade-up"  className="Text5">
                <p data-Aos="fade-left" >Keep track of where your website ranks on Google with
                unlimited on-demad checks</p>
                <button>Sign up with Email</button>
                <i class="fa fa-credit-card"></i>
            </div>
         <div data-Aos="fade-up"  className="CreditCard">
             <img data-Aos="fade-up"  src="credit-card-solid.svg"/>
             < p data-Aos="fade-left" >NO CREDIT CARD REQUIRED</p>
         </div>
        </div>
    )
}

export default Main
