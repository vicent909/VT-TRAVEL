import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SidebarAdmin() {
    return (
        <nav className="d-md-block bg-light sidebar" id="sidebar-menu" style={{position: 'sticky', top: 0, padding: '20px', height: '100%'}}>
            <div className='d-flex justify-content-center'>
                <img src="/travel.png" style={{width: '100%'}}/>
            </div>
            <hr />
            <div className="position-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item" >
                        <NavLink to={'/admin'} className="nav-link nav-link-sidebar" id="nav-product"> <span className="icon material-symbols-outlined me-2">home</span>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/admin/categories' className="nav-link nav-link-sidebar" href="" id="nav-category"> <span className="icon material-symbols-outlined me-2">category</span>Categories</NavLink>
                    </li>
                </ul>
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                    <span>Account</span>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <NavLink onClick={() => localStorage.clear()} className="nav-link nav-link-sidebar" href="" id="nav-logout"> <span className="icon material-symbols-outlined me-2">logout</span>Logout</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
