import React, { useEffect, useState } from 'react'
import { api } from '../../utils/api';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import BookedComponent from '../../components/BookedComponent';

export default function TravelInfo() {
    const [travel, setTravel] = useState({});
    const [count, setCount] = useState(0)
    const [booked, setBooked] = useState([]);
    const id = useParams().id;

    const getTravel = async () => {
        try {
            const { data } = await api({
                url: `/travels/${id}`,
                headers: {}
            })

            setTravel(data);
            setCount(data.Users.length);
            setBooked(data.Users);
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message
            })
        }
    }
    
    const deleteBooking = async (id) => {
        try {
            const { data } = await api({
                method: 'DELETE',
                url: `/travels/userTravel/${id}`,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })

            Swal.fire({
                icon:'success',
                title: 'Success delete booking',
                text: data.message
            })
            getTravel();
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
        getTravel();
    }, [])
    return (
        <div style={{ padding: 30 }}>
            <h3>Travel info</h3>
            <hr />
            {travel.destination &&
                <div>
                    <div className="row mt-4">
                        <div className="col-12 card card-detail-left">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={travel.Images[0]?.imageUrl} width={'100%'} style={{ borderRadius: 18 }} />
                                    <div className="card card-detail-info mt-4">
                                        <div className='card-detail-price-top'>
                                            <div>
                                                <h6>Capacity </h6>
                                                <h6>Price</h6>
                                            </div>
                                            <div>
                                                <p> {count} (booked) / {travel.capacity} person</p>
                                                <p>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(travel.price)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <h1>{travel.destination}</h1>
                                    <hr />
                                    <p>{travel.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        {console.log(travel)}
                        <div className="card card-info-booked">
                            <h3>Booked List</h3>
                            <hr />
                            <div className="row">
                                {booked.length < 1 && <p style={{textAlign: "center"}}>No One Book This Travel</p>}
                                {booked.map((e) => {
                                    return <BookedComponent name={e.UserProfile.name} email={e.email} phone={e.UserProfile.phone} onClick={() => deleteBooking(e.UserTravel.id)}/>
                                })}
                            </div>
                            
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
