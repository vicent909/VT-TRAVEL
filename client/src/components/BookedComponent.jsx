import React from 'react'
import { Link } from 'react-router-dom'

export default function BookedComponent({ name, email, phone, onClick }) {
  return (
    <div className='col-md-6'>
      <div className=' card card-info-item'>
        <div className='d-flex justify-content-between'>
          <h5>{name}</h5>
          <Link onClick={onClick} className="ms-3 tooltips"><span className="icon material-symbols-outlined text-danger">delete</span><span className="tooltiptext">Delete Booking</span></Link>
        </div>
        <hr />
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    </div>
  )
}
