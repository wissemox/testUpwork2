import React,{useState  , useEffect} from 'react'
import './Crypto.css'
import {useSelector} from 'react-redux'
import CryptoMap from './CryptoMap'
import Aos from 'aos'
import "aos/dist/aos.css"
const Crypto = () => {
    // Get maping item 
    const [Bolen , setBolen]=useState(false)
    const Item = useSelector(state => state.domain.data)
    useEffect(() => {
        Aos.init({duration: 2000});
      }, [])
    return (
        <div>
            <div data-Aos="fade-up"   className="CoinBase">
                <img src="Delete.png"/>
                <p data-Aos="fade-left" >buy and crypto</p>
                <p data-Aos="fade-right" >2</p>
               
                <div data-Aos="fade-up"  className="Coinbase">
                <p data-Aos="fade-left" >coinbase.com</p> 
                <img src="Flash.png" data-Aos="fade-right" />
                <img src="Menu01.png" data-Aos="fade-left" />
                {/* Flash */}
              
                </div>
              
                <div data-Aos="fade-up"   className="GetFirestPage">
       
                <button>Get first page data </button>
                <img src="Refrash.png"/>
                <i class="fa fa-trash-alt"></i>
                </div>
            </div>
            <div>

            </div>

          
            <div data-Aos="fade-up"  className="MapItemCrypto">
                <div data-Aos="fade-up"  className="SearchResult">
                    <p data-Aos="fade-left" >#</p>
                    <p data-Aos="fade-right" >Search Result</p>
                    <div className="Url">
                    <p data-Aos="fade-left" >url</p>
                    </div>
                      {/* Map item here  */}
                 
                </div>
                 {/* Map item here  */}
                <div data-Aos="fade-up"  className="MapCrypdto"> 
                    {Item&&Item.map((el , i)=><CryptoMap Bolen={Bolen} setBolen={setBolen} el={el} key={i}  i={i}/>)}
                   </div>
                   
            </div>
        </div>
    )
}

export default Crypto
