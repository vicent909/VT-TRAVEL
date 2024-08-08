import React, { useEffect, useState } from 'react'
import HomeCountItem from '../components/HomeCountItem';
import TravelPackageCard from '../components/TravelPackageCard';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { api } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { actions, fetchCategories } from '../store';

export default function HomePage() {
    const navigate = useNavigate();
    const [travels, setTravels] = useState([]);

    const categories = useSelector((state) => state.categories)

    const dispatch = useDispatch()

    const redux = () => {

    }

    const getTravel = async () => {
        try {
            const { data } = await api({
                url: '/travels?page[limit]=4',
                headers: {}
            })

            setTravels(data.rows);
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
        dispatch(fetchCategories());
    }, [])
    return (
        <div>
            <section className='home-top-container' style={{ height: '100vh', width: '100%' }}>
                <div className="container ">
                    <h5 className='your-travel'>Your Travel Services</h5>
                    <h1 className='best-escape'>Best Escape Choice</h1>
                    <p className='main-desc'>Experience the Best in Travel, A Journey Beyond Your Imagination, Where Every Destination <br /> Become Unforgetable Adventure.</p>
                    <button onClick={() => navigate('/login')} className='btn btn-get-started'>Get Started</button>
                </div>
            </section>
            <section style={{ backgroundColor: '#e9e9e9', paddingTop: 40, paddingBottom: 40 }}>
                <div className='container'>
                    <div className="row" style={{ height: '70vh' }}>
                        <HomeCountItem count={"500+"} desc={"Users has been traveled around the earth with us"} />
                        <HomeCountItem count={"85"} desc={"Travel Packages that you can choose for you and your family or your friends"} />
                        <HomeCountItem count={"20"} desc={"Countries we have explored"} />
                    </div>
                </div>
            </section>
            <section style={{ paddingTop: 40, paddingBottom: 40 }}>
                <div className="container" >
                    <div className="row">
                        {travels.map((e) => {
                            return <TravelPackageCard
                                key={e.id}
                                destination={e.destination}
                                image={e.Images[0]?.imageUrl}
                                onClick={() => navigate(`/detail/${e.id}`)}
                            />
                        })}
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Link to={'/all-travel'} className='view-more-link nav-link d-flex align-items-center gap-2'>View More <span className="icon material-symbols-outlined" style={{ fontSize: 18, margin: 0, padding: 0 }}>arrow_forward</span></Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
