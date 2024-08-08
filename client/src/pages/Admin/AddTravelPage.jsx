import React, { useEffect, useState } from 'react'
import { api } from '../../utils/api';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddTravelPage() {
    const navigate = useNavigate()
    const [dataTravel, setDataTravel] = useState({
        destination: "",
        price: "",
        capacity: "",
        description: "",
        CategoryId: "",
        image: ""
    })
    const [travelPostId, setTravelPostId] = useState("");
    const [imgFile, setImgFile] = useState(null)
    const [categories, setCategories] = useState([]);
    const id = useParams().id;

    const onChangeHandler = (event) => {
        setDataTravel({ ...dataTravel, [event.target.name]: event.target.value });
    }

    const getCategories = async () => {
        try {
            const { data } = await api({
                url: '/travels/categories',
                headers: {}
            })

            setCategories(data);
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message
            })
        }
    }

    const addTravel = async () => {
        try {
            const { data } = await api({
                method: 'POST',
                url: '/travels',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    destination: dataTravel.destination,
                    description: dataTravel.description,
                    price: dataTravel.price,
                    capacity: dataTravel.capacity,
                    CategoryId: dataTravel.CategoryId
                }
            })

            let formData = new FormData()
            formData.append('image', imgFile);

            await api({
                method: 'POST',
                url: `/travels/image/${data.id}`,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }, data: formData
            })

            Swal.fire({
                icon: 'success',
                title: 'Success add Travel'
            })
            navigate('/admin')
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message
            })
        }
    }

    const postImage = async (event) => {
        event.preventDefault()
        try {
            let formData = new FormData()
            formData.append('image', imgFile);

            const { data } = await api({
                method: 'POST',
                url: '/image/' + travelPostId,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }, data: formData
            })

            Swal.fire({
                icon: 'success',
                title: 'Success add Travel'
            })
            navigate('/admin')
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message
            })
        }
    }

    const getTravelById = async () => {
        try {
            const { data } = await api({
                url: `/travels/${id}`,
                headers: {}
            })

            setDataTravel({
                destination: data.destination,
                price: data.price,
                capacity: data.capacity,
                description: data.description,
                CategoryId: data.CategoryId,
                image: data.Images.length > 0 ? data.Images[0]?.imageUrl : ""
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

    const putTravelById = async () => {
        try {
            const { data } = await api({
                method: 'PUT',
                url: `/travels/${id}`,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    destination: dataTravel.destination,
                    description: dataTravel.description,
                    price: dataTravel.price,
                    capacity: dataTravel.capacity,
                    CategoryId: dataTravel.CategoryId
                }
            })

            Swal.fire({
                icon: 'success',
                title: 'Success Update Travel'
            })
            navigate('/admin')
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message
            })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (id) {
            putTravelById()
        } else {
            addTravel();
        }
    }

    useEffect(() => {
        getCategories();
        { id && getTravelById() };
    }, [])

    return (
        <div className='container' style={{ minHeight: '100vh' }}>
            <div className="card add-travel-card">
                {!id ? <h3>Add Travel</h3> : <h3>Edit Travel</h3>}
                <hr />
                <form onSubmit={(e) => submitHandler(e)}>
                    <label htmlFor="destination" className='form-label'>Destination</label>
                    <input type="text" name='destination' id='destination' className='form-control mb-3' value={dataTravel.destination} onChange={(event) => onChangeHandler(event)} />
                    <div className='d-flex gap-4' >
                        <div style={{ width: '100%' }}>
                            <label htmlFor="price" className='form-label'>Price</label>
                            <input type="number" name='price' id='price' className='form-control mb-3' value={dataTravel.price} onChange={(event) => onChangeHandler(event)} />
                        </div>
                        <div style={{ width: '100%' }}>
                            <label htmlFor="capacity" className='form-label'>Capacity</label>
                            <input type="number" name='capacity' id='capacity' className='form-control mb-3' value={dataTravel.capacity} onChange={(event) => onChangeHandler(event)} />
                        </div>
                    </div>
                    <label htmlFor="CategoryId" className='form-label'>Category</label>
                    <select name="CategoryId" id="CategoryId" className='form-select mb-3' value={dataTravel.CategoryId} onChange={(event) => onChangeHandler(event)}>
                        <option value=""> Select Category</option>
                        {categories.map((e) => {
                            return <option key={e.id} value={e.id}>{e.category}</option>
                        })}
                    </select>
                    <label htmlFor="description" className='form-label'>Description</label>
                    <textarea name="description" id="description" className='form-control mb-3' rows={6} value={dataTravel.description} onChange={(event) => onChangeHandler(event)}></textarea>
                    <div style={{ display: 'flex', gap: 20, alignItems: 'end', marginBottom: 20 }}>
                        {id &&
                            <div>
                                <img src={dataTravel.image} style={{ borderRadius: 18, maxHeight: '180px' }} />
                                <br />
                            </div>
                        }
                        <div style={{flexGrow: 1}}>
                            <label htmlFor="description" className='form-label'>Image</label>
                            {id ? 
                                <input type="file" className='form-control' disabled onChange={(event) => setImgFile(event.target.files[0])} />
                                : 
                                <input type="file" className='form-control' onChange={(event) => setImgFile(event.target.files[0])} />
                            }
                        </div>
                    </div>
                    <div className='d-flex gap-4'>
                        <button onClick={() => navigate('/admin')} className='btn btn-outline-secondary mt-2' style={{ width: '100%', height: '40px' }}>Back</button>
                        <button type='submit' className='btn btn-success' style={{ width: '100%' }}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
