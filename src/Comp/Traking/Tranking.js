import React,{useEffect} from 'react'
import './Tracking.css'
import Aos from 'aos'
import "aos/dist/aos.css"
const Tranking = () => {
    useEffect(() => {
        Aos.init({duration: 2000});
      }, [])
    return (
        <div className="ALL">
            <div  data-Aos="fade-up"   className="trackin01"> 

            <div   data-Aos="fade-up" className="trackin">
            <p  data-Aos="fade-left" >Start tracking in 30 seconds - Free</p>
            </div>
            <div  data-Aos="fade-up"  className="NoCredit">
            <p  data-Aos="fade-right">No credit card required. We know you il loveit</p>
            </div>
            <button  data-Aos="fade-up">Sing up for free</button>
            </div>
        </div>
    )
}

export default Tranking
