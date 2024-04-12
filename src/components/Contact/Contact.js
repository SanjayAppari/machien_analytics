import React from 'react'
import { Link } from 'react-router-dom'
import '../Contact/Contact.css'

function Contact() {
  return (
    <div className="mt-5 pt-5 pb-5 footer border-0">
          <div className="container border-0">
            <div className="row border-0">
              <div className="col-lg-5 col-xs-12 about-company border-0">
                <h2>Contact Us</h2>
                <p className="pr-5 text-white-50">For any queries and to know more about our work , Contact Us.</p>
                <p>
                  <a href="#"><i className="fa fa-facebook-square me-3 "></i></a>
                  <a href="#"><i className="fa fa-linkedin-square me-3"></i></a>
                  <a href="#"><i class="fa-brands fa-instagram"></i></a>
                </p>
              </div>
              <div className="col-lg-3 col-xs-12 links mb-3 border-0">
                <h4 className="mt-lg-0 mt-sm-3">Direct Links</h4>
                <ul className="m-0 p-0">
                  <li><Link to="/">Home</Link></li>
                  <li> <Link to="/login">Log In</Link></li>
                  <li> <Link to="/signup">Sign Up</Link></li>
                </ul>
              </div>
              <div className="col-lg-4 col-xs-12 location border-0">
                <h4 className="mt-lg-0 mt-sm-4 mb-3">Owner Details</h4>
                <p className="mb-3"><i className="fa fa-phone me-3 mb-2"></i>(+91) 8074963346</p>
                <p><i className=" mb-0 pb-0 fa fa-envelope-o me-3"></i>apparisanjaym6@gmail.com</p>
                <p> <a style={{textDecoration:'none' ,color:'white' ,fontSize:'16px'}} target='_blank' href="https://sanjayappari.onrender.com/">Owner's Portfolio</a> </p>
              </div>
            </div>
            <div className="row mt-5 border-0">
              <div className="col copyright">
                <p className=""><small className="text-white-50">© 2024. All Rights Reserved.</small></p>
              </div>
            </div>
          </div>
        </div>

  )
}

export default Contact
