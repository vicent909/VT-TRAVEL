import React, { useEffect, useState } from 'react'
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
    setUser({ ...user, [e.target.name]: e.target.value })
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

  async function handleCredentialResponse({ credential }) {
    try {
      // console.log("Encoded JWT ID token: " + response.credential);

      const { data } = await api({
        method: 'POST',
        url: '/users/google-login',
        data: {
          googleToken: credential
        }
      })

      if (!data.create) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('role', data.role);

        navigate('/')
      }else{
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('role', data.role);

        navigate('/user-profile')
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message
      })
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "1086145307745-8jmgqbbr2hn6cb3ngub2k1di52qirr1t.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large", width: "1000px" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, [])

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
              <input type="text" className='form-control mb-3' id='email' name='email' placeholder='Please input your email' value={user.email} onChange={(e) => changeHandler(e)} required />
              <label htmlFor="password" className='form-label'>Pasword</label>
              <input type="password" className='form-control' id='password' name='password' placeholder='Please input your password' value={user.password} onChange={(e) => changeHandler(e)} required />
              <button className='btn-detail-join mt-4 btn-register' onClick={login}>Login</button>
              <p style={{textAlign: 'center', marginTop: 10, marginBottom: 10, color: '#c3c3c3'}}>or</p>
              <div className="div d-flex justify-content-center">
                <div style={{ width: 'fit-content'}} id="buttonDiv">Continue with google</div>
              </div>
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
