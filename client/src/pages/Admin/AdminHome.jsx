import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminHomeTableItem from '../../components/AdminHomeTableItem'
import { api } from '../../utils/api';
import Swal from 'sweetalert2';

export default function AdminHome() {
    const navigate = useNavigate();
    const [travels, setTravels] = useState([]);

    const getTravel = async () => {
        try {
            const { data } = await api({
                url: '/travels',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
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

    const deleteTravel = async(id) => {
        try {
            const { data } = await api({
                method: 'DELETE',
                url: `/travels/${id}`,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Success Delete Travel',
                text: data.message
            });

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
        <div style={{ height: '200vh', padding: 30, margin: 0 }}>
            <div className="mt-4">
                <div className='d-flex justify-content-between align-items-center'>
                    <h3>Travel</h3>
                    <button onClick={() => navigate('/admin/add-travel')} className='btn-detail-join' style={{width: '200px'}}>+ Add Travel</button>
                </div>
                <hr />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Price</th>
                            <th scope="col">Capacity</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {travels.map((e, i) => {
                            return <AdminHomeTableItem
                                key={e.id}
                                index={i + 1}
                                destination={e.destination}
                                price={e.price}
                                booked={e.Users.length}
                                capacity={e.capacity}
                                category={e.Category.category}
                                onClickDel={() => deleteTravel(e.id)}
                                onClickEdit={() => navigate(`/admin/edit-travel/${e.id}`)}
                                onClickInfo={() => navigate(`/admin/travel/${e.id}/info`)}
                            />
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
