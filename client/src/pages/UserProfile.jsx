import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { api } from '../utils/api'
import { useNavigate } from 'react-router-dom'

export default function UserProfile() {
  const navigate = useNavigate()
  const [userProfile, setUserProfile] = useState({
    name: "",
    phone: "",
    address: ""
  })

  const changeHandler = (event) => {
    setUserProfile({...userProfile, [event.target.name]: event.target.value})
  }

  const userId = localStorage.getItem('id')

  const addUserProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api({
        method: 'POST',
        url: `/users/user-profile`,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        data: {
          name: userProfile.name,
          phone: userProfile.phone,
          address: userProfile.address
        }
      })

      Swal.fire({
        icon: 'success',
        title: 'Success add your profile',
      })

      navigate('/');
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message
      })
    }
  }

  return (
    <div className='container container-add-userprofile'>
      <div className="card userprofile-card">
        <h3>Please enter your personal data</h3>
        <hr />
        <form onSubmit={(e) => addUserProfile(e)}>
          <label htmlFor="name" className='form-label'>Name</label>
          <input type="text" name='name' id='name' className='form-control mb-3' placeholder='Name' value={userProfile.name} onChange={(event) => changeHandler(event)}/>
          <label htmlFor="phone" className='form-label'>Phone Number</label>
          <input type="text" name='phone' id='phone' className='form-control mb-3' placeholder='Phone Number' value={userProfile.phone} onChange={(event) => changeHandler(event)}/>
          <label htmlFor="address" className='form-label' >Address</label>
          <textarea rows={6} name="address" id="address" className='form-control mb-4' value={userProfile.address} onChange={(event) => changeHandler(event)}></textarea>
          <button type='submit' className='btn-detail-join btn-register'>Submit</button>
        </form>
      </div>
    </div>
  )
}
