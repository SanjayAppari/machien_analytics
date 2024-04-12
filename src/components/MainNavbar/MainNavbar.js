import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function MainNavbar() {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState("machines");
    return (
        <>
            <nav class="navbar navbar-expand-lg" style={{width:'100%', height: '6vh', position: 'sticky', top: '0', zIndex:'1111111', backgroundColor: 'white', borderBottom: '2px solid rgb(199, 185, 185)' }}>
                <div class="container-fluid">
                    <Link class="navbar-brand" to="#" style={{ fontSize: '20px', fontStyle: 'bold', fontWeight: '500' }}>Data Pulse</Link>
                    <button class="navbar-toggler" onclick={()=>navigate('/')} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div class="mx-auto"></div>
                        <ul class="navbar-nav mb-2 mb-lg-0" style={{ fontWeight: '500' }}>
                            <li class="nav-item" style={{backgroundColor: isOpen=="dashboard" && 'rgb(255, 184, 5)'}}>
                                <Link class="nav-link" to="/" onClick={()=>setIsOpen("dashboard")} style={{ color: 'black' }}><i class="fa-solid fa-chart-simple"></i> Home</Link>
                            </li>
                            <li class="nav-item" style={{backgroundColor: isOpen=="machines" && 'rgb(255, 184, 5)'}}>
                                <Link class="nav-link" to="/machines" onClick={()=>setIsOpen("machines")} style={{ color: 'black' }}><i class="fa-sharp fa-solid fa-cubes"></i> Machines</Link>
                            </li>
                            <li class="nav-item" style={{backgroundColor: isOpen=="profile" && 'rgb(255, 184, 5)'}}>
                                <Link class="nav-link" to="/profile" onClick={()=>setIsOpen("profile")} style={{ color: 'black' }} role="button">
                                    <i class="fa-solid fa-user"></i> Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default MainNavbar
