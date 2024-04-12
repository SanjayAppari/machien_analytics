import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../Login/Login.css'

function Login() {

    
    const host = "http://192.168.101.65:1708";

    const navigate = useNavigate();
    const [company, setCompany] =useState({
        name: "", email: "", password: "", confirmPassword: ""
    })

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const { name, email, password, confirmPassword } = company;
        if (confirmPassword !== password) {
            alert("passwords didnt match");
        }
        else{
            const response = await fetch(`${host}/api/company/addCompany`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('companyId', json.company.id)
                localStorage.setItem('token', json.authToken);
                navigate('/machines');
            }
            else {
                alert("Enter Invalid Credentials");
            }
        }
    }

    const handleChange = (e)=>{
        setCompany({...company, [e.target.name]:e.target.value});
    }

    const style = {
        width: '60vh'
    }
  return (
    <div className="login">
      <div className="loginMain">
        <h3>"Hey Welcome! Have a great experience with us"</h3>
        <div className="loginForm"  style={style}>
            <span className="loginName">DATA PULSE</span>
            <span className="loginSubName">Machine Analytics DashBoard</span>
            <center>
                <span className="loginSubText">Real-Time Insights | Informed Decisions | Uncover, Analyze, Act | Empowering Decisions Through Data</span>
            </center>
            <div className="actualForm">
            <div className="inputField">
                    <div className="inputLabel">Username</div>
                    <div className="inputTag">
                        <input type="text" placeholder="Enter your Username" name="name" value={company.name} onChange={handleChange}/>
                    </div>
                </div>
                <div className="inputField">
                    <div className="inputLabel">Email</div>
                    <div className="inputTag">
                        <input type="text" placeholder="Enter your Email" name="email" value={company.email} onChange={handleChange} />
                    </div>
                </div>
                <div className="inputField">
                    <div className="inputLabel">Password</div>
                    <div className="inputTag">
                        <input type="password" placeholder="Enter your password" name="password" value={company.password}  onChange={handleChange}/>
                    </div>
                </div>
                <div className="inputField">
                    <div className="inputLabel">Confirm Password</div>
                    <div className="inputTag">
                        <input type="password" placeholder="Confirm Password" name="confirmPassword" value={company.confirmPassword} onChange={handleChange} />
                    </div>
                </div>
                <span className="inputLink">Already have an account ?
                    <a href="/login"> Log In</a>
                </span>
                <button className="btn loginBtn" onClick={handleSubmit}>SIGN UP</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
