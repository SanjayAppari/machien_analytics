import React, { useEffect, useState } from 'react'
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {

  const host = "http://192.168.101.65:1708";
  const navigate = useNavigate();

  const [company, setCompany] = useState({
    email: "", password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/company/loginCompany`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(company)
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
    } catch (err) {
      console.error(err.message);
    }

  }

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  }


  useEffect(()=>{
    if(localStorage.getItem('token')){
        navigate('/machines');
    }
  },[]);

  return (
    <div className="login">
      <div className="loginMain">
        <h3>"Welcome Back!"</h3>
        <div className="loginForm">
          <span className="loginName">DATA PULSE</span>
          <span className="loginSubName">Machine Analytics DashBoard</span>
          <center>
            <span className="loginSubText">Real-Time Insights | Informed Decisions | Uncover, Analyze, Act | Empowering Decisions Through Data</span>
          </center>
          <div className="actualForm">
            <div className="inputField">
              <div className="inputLabel">Email or Username</div>
              <div className="inputTag">
                <input type="text" name="email" placeholder="Enter your email/username" value={company.email} onChange={handleChange} />
              </div>
            </div>
            <div className="inputField">
              <div className="inputLabel">Password</div>
              <div className="inputTag">
                <input type="password" name="password" placeholder="Enter your password" value={company.password} onChange={handleChange} />
              </div>
            </div>
            <span className="inputLink">Don't have an account ?
              <a href="/signup"> Sign Up</a>
            </span>
            <button className="btn loginBtn" onClick={handleSubmit}>LOG IN</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
