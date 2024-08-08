import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'
import SidebarAdmin from '../components/SidebarAdmin'

export default function AdminLayout() {
  return (
    <>
      <div className="row" style={{width: '100%'}}>
        <div className="col-md-2 p-0">
          <SidebarAdmin />
        </div>
        <div className="col-md-10 p-0" style={{backgroundColor: '#fff'}}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}
