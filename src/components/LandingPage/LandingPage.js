import React, { useEffect } from 'react'
import './LandingPage.css'
import Navbar from './Navbar/Navbar'
import pic1 from '../../assets/pic3.jpg'
import { useNavigate } from 'react-router-dom'
import output from '../../assets/output.jpg'
import Contact from '../Contact/Contact'

function LandingPage() {
    const navigate = useNavigate();

  return (
    <div className="main">
        <Navbar/>
        <div className="landingPage" id="landingPage">
            <div className="homeText">
                <span className='mainText'>Data Pulse</span>
                <center>
                    <span className='subText'>Real-Time Insights, Informed Decisions. Our dashboard empowers you to transform raw data into actionable insights with ease. Drive innovation, efficiency, and growth with DataPulse Analytic. </span>
                </center>
            </div>
            <button className="btn homeButton" onClick={()=>navigate('/login')}>
                {
                    localStorage.getItem('token') ? "Open DashBoard" : "Get Started"
                }
            </button>
            <div className="homeImg" >
                <img src={pic1} alt="" style={{zIndex:'-1'}} />
            </div>
        </div>
        <div className="about" id="about">
            <center>
                <h5 style={{paddingLeft:'10px'}}>About</h5>
            </center>
            <div className="about_container">
                <div className="about_img">
                    <img src={output} alt="" />
                </div>
                <br />
                <div style={{position:'relative', width:'80%'}}>
                    <center>
                    Real-Time Insights, Informed Decisions. Our dashboard empowers you to transform raw data into actionable insights with ease. Drive innovation, efficiency, and growth with DataPulse Analytic.
                    </center>
                </div>
            </div>
        </div>
        <Contact/>
    </div>
  )
}

export default LandingPage
