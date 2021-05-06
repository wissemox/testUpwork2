import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Domain from './domain'
import { fetchAllDomain } from './redux/domain'
import Home from './Comp/Home/Home'
import Main from './Comp/Main/Main'
import './index.css'
import Map from './Comp/Map/Map'
import Register from './Comp/Register/Register'
import Login from './Comp/Login/Login'
import Contact from './Comp/Contactus/Contact'
import {BrowserRouter ,Route} from 'react-router-dom'
import Tranking from './Comp/Traking/Tranking'
import Crypto from './Comp/CryptoLink/Crypto'
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDomain())
  }, [])

  return( <div>
    <BrowserRouter>
    <Route exact path="/contact" render={()=><Contact/>} /> 
    <Route exact path="/" render={()=><Home/>} /> 
    <Route exact path="/" render={()=> <Main/>} /> 
    <Route exact path="/" render={()=>  <Domain />} /> 
    <Route exact path="/" render={()=>    <Map/>} /> 
    <Route exact path="/SingUp" render={()=>    <Register/>} /> 
    <Route exact path="/login" render={()=><Login/>} />
    {/* Tranking */}
    <Route exact path="/" render={()=><Tranking/>} />
    <Route exact path="/" render={()=><Crypto/>} />
    </BrowserRouter>
  </div>) ;
}

export default App;
