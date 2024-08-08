import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { api } from '../utils/api'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const changeHandler = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    const register = async (event) => {
        event.preventDefault()

        try {
            const { data } = await api({
                method: 'POST',
                url: '/users/register',
                data: {
                    email: user.email,
                    password: user.password
                }
            })

            localStorage.setItem('token', data.access_token);
            localStorage.setItem('id', data.userId);
            localStorage.setItem('role', data.role);

            Swal.fire({
                icon: 'success',
                title: 'Register Success',
                text: 'Please complete your profile data'
            })

            navigate('/user-profile')
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
        <div className='register-container'>
            <div className='container card register-card'>
                <div className="row" style={{ height: "100%" }}>
                    <div className="col-md-7 register-left-container"></div>
                    <div className="col-md-5 register-right-container">
                        <div>
                            <img src="/travel.png" height={40} />
                        </div>
                        <div style={{ width: '100%', marginBottom: 10 }}>
                            <h3>Register New Account</h3>
                            <label htmlFor="email" className='form-label'>Enail</label>
                            <input type="text" className='form-control' id='email' name='email' placeholder='Please input your email' value={user.email} onChange={(event) => changeHandler(event)} />
                            <label htmlFor="password" className='form-label'>Pasword</label>
                            <input type="password" className='form-control' id='password' name='password' placeholder='Please input your password' value={user.password} onChange={(event) => changeHandler(event)} />
                            <button className='btn-detail-join mt-4 btn-register' onClick={register}>Register</button>
                            <p style={{ textAlign: 'center', marginTop: 8, color: '#c3c3c3' }}>Have an Account? <Link to={'/login'} style={{ textDecoration: 'none' }}>Login Here</Link></p>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
