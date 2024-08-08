import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { api } from '../utils/api'

export default function LoginPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const changeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const login = async () => {
    try {
      const { data } = await api({
        method: 'POST',
        url: '/users/login',
        headers: {},
        data: {
          email: user.email,
          password: user.password
        }
      })

    localStorage.setItem('token', data.access_token);
    localStorage.setItem('id', data.userId);
    localStorage.setItem('role', data.role);

    navigate('/')
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message
      })
    }
  } 

  return (
    <div className='login-container'>
      <div className='container card register-card'>
        <div className="row" style={{ height: "100%" }}>
          <div className="col-md-5 login-left-container">
            <div>
              <img src="/travel.png" height={40} />
            </div>
            <div style={{ width: '100%', marginBottom: 10 }}>
              <h3 className='mb-3'>Login to Your Account</h3>
              <label htmlFor="email" className='form-label'>Enail</label>
              <input type="text" className='form-control mb-3' id='email' name='email' placeholder='Please input your email' value={user.email} onChange={(e) => changeHandler(e)} required/>
              <label htmlFor="password" className='form-label'>Pasword</label>
              <input type="password" className='form-control' id='password' name='password' placeholder='Please input your password' value={user.password} onChange={(e) => changeHandler(e)} required/>
              <button className='btn-detail-join mt-4 btn-register' onClick={login}>Login</button>
              <p style={{ textAlign: 'center', marginTop: 8, color: '#c3c3c3' }}>Don't Have an Account? <Link to={'/register'} style={{ textDecoration: 'none' }}>Register Here</Link></p>
            </div>
            <div>
            </div>
          </div>
          <div className="col-md-7 login-right-container"></div>
        </div>
      </div>
    </div>
  )
}
