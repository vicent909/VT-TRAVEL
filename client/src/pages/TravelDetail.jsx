import React, { useEffect, useState } from 'react'
import { api } from '../utils/api';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import TravelPackageCard from '../components/TravelPackageCard';

export default function TravelDetail() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [travel, setTravel] = useState({});
  const [randomTravel, setRandomTravel] = useState([]);
  const [joinedUser, setJoinedUser] = useState(0)

  const getTravel = async () => {
    try {
      const { data } = await api({
        url: `/travels/${id}`,
        headers: {}
      })

      setTravel(data);
      setJoinedUser(data.Users.length)
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message
      })
    }
  }

  const getRandomTravel = async () => {
    try {
      const { data } = await api({
        url: `/travels/random?page[limit]=4`,
        headers: {}
      })

      setRandomTravel(data.rows)
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message
      })
    }
  }

  const payment = async () => {
    try {
      const { data } = await api({
        method: 'POST',
        url: '/travels/generate-midtrans-token/' + id,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })

      console.log(data)

      window.snap.pay(data.token, {
        onSuccess: function(result){
          /* You may add your own implementation here */
          joinTravel()
        }
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message
      })
    }
  }

  const joinTravel = async () => {
    try {
      const { data } = await api({
        method: 'POST',
        url: `/travels/userTravel/${id}`,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })

      Swal.fire({
        icon: 'success',
        title: 'You Have Booked the Travel'
      })
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

  useEffect(() => {
    getTravel();
    getRandomTravel();
  }, [id]);

  return (
    <div className='container'>
      {travel.destination &&
        <div>
          <div className="row mt-4">
            <div className="col-md-9 card card-detail-left">
              <div className="row">
                <div className="col-md-4">
                  <img src={travel.Images[0]?.imageUrl} width={'100%'} style={{ borderRadius: 18 }} />
                </div>
                <div className='col-md-8'>
                  <h1>{travel.destination}</h1>
                  <hr />
                  <p>{travel.description}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card card-detail-price">
                <div className='card-detail-price-top'>
                  <div>
                    <h6>Capacity </h6>
                    <h6>Price</h6>
                  </div>
                  <div>
                    <p> {joinedUser} (booked) / {travel.capacity} person</p>
                    <p>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(travel.price)}</p>
                  </div>
                </div>
                <hr />
                <button className='btn-detail-join' onClick={payment}>
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      <div className="bottom-container mt-4">
        <h2>You may like this Travel</h2>
        <hr />
        <div className="row">
          {randomTravel.map((e) => {
            return <TravelPackageCard
              key={e.id}
              destination={e.destination}
              image={e.Images[0]?.imageUrl}
              type={'all'}
              onClick={() => navigate(`/detail/${e.id}`)}
            />
          })}
        </div>
      </div>
    </div>
  )
}
