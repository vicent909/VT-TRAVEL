import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const changeColor = () => {
        if(window.scrollY >= 60){
            setScrolled(true)
        }else{
            setScrolled(false)
        }
    }

    window.addEventListener('scroll', changeColor)
    
    return (
        <nav className={scrolled ? "navbar navbar-expand-lg scrolled-navbar" : "navbar navbar-expand-lg fixed-navbar" } style={{height: '60px'}} >
            <div className="container">
                <img src="/travel.png" height='30px' onClick={() => navigate('/')} style={{cursor: 'pointer'}}/>
                {/* <a className="navbar-brand" href="#">Navbar</a> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse  md-d-flex justify-content-between" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link active" aria-current="page" href="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/all-travel'} className="nav-link">All Travel</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Pricing</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown link
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? 
                        <button className={scrolled ? 'btn btn-outline-secondary' : 'btn btn-outline-light'} style={{width: '200px', marginLeft: '20px'}} onClick={() => navigate('/login')}>
                            Login / Register
                        </button>
                        : 
                        <button className={scrolled ? 'btn btn-outline-secondary' : 'btn btn-outline-light'} style={{width: '200px', marginLeft: '20px'}} onClick={() => localStorage.clear()}>
                            Logout
                        </button>

                    }
                </div>
            </div>
        </nav>
    )
}
