import React from 'react'

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg" style={{height: '8vh',position: 'sticky', top:'0', backgroundColor:'rgb(255, 184, 5)', }}>
            <div class="container-fluid">
                <a class="navbar-brand" href="#" style={{fontSize:'25px', fontStyle:'bold', fontWeight:'400', color:'white'}}>Data Pulse</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="mx-auto"></div>
                    <ul class="navbar-nav mb-2 mb-lg-0" style={{fontWeight:'500'}}>
                        <li class="nav-item" >
                            <a class="nav-link"href="#landingPage" style={{color:'white'}}>Home</a>
                        </li>
                        {/* <li class="nav-item">
                            <a class="nav-link" href="#" style={{color:'white'}}>Services</a>
                        </li> */}
                        <li class="nav-item">
                            <a class="nav-link" href="#about" style={{color:'white'}}>About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" style={{color:'white'}}>Contact Us</a>
                        </li>
                    </ul>   
                </div>
            </div>
        </nav>
    )
}

export default Navbar
