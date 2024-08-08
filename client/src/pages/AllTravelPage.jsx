import React, { useEffect, useState } from 'react'
import TravelPackageCard from '../components/TravelPackageCard'
import Swal from 'sweetalert2';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function AllTravelPage() {
    const navigate = useNavigate()
    const [travels, setTravels] = useState([]);
    const [categorySelected, setCategorySelected] = useState('');
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [searchUrl, setSearchUrl] = useState("")
    const [limit, setLimit] = useState(12);
    const [offset, setOffset] = useState(0);

    const searchHandler = (e) => {
        e.preventDefault()
        setSearchUrl(search)
    }

    const url = `/travels?search=${searchUrl}&categoryId=${categorySelected}&page[limit]=${limit}&page[offset]=${offset}`

    const getTravels = async () => {
        try {
            const { data } = await api({
                url: url,
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

    const radioHandler = (e) => {
        setCategorySelected(e.target.value)
    }

    useEffect(() => {
        getTravels();
        getCategories();
    }, [url])
    return (
        <div className='container'>
            <div>
                <hr />
                <form className='d-flex gap-2' onSubmit={(e) => searchHandler(e)}>
                    <input type="text" className='form-control' name='search' placeholder='Search Travel here' onChange={(event) => setSearch(event.target.value)}/>
                    <button className='btn btn-outline-secondary' type='submit'>Search</button>
                </form>
                <hr />
            </div>
            <div className="row">
                <div className="col-md-2">
                    <h5>Category</h5>
                    <hr />
                    <div className="radio-gorup">
                        <div className='d-flex gap-2 mb-1'>
                            <input className='form-check-input' type="radio" name="category" id="All Continent" value={""} onChange={(e) => radioHandler(e)} />
                            <label className='form-check-label' htmlFor="All Continent">All Continent</label>
                        </div>
                        {categories.map((e) => {
                            return <div className='d-flex gap-2 mb-1' key={e.id}>
                                <input className='form-check-input' type="radio" name="category" id={e.category} value={e.id} onChange={(e) => radioHandler(e)} />
                                <label className='form-check-label' htmlFor={e.category}>{e.category}</label>
                            </div>
                        })}
                    </div>
                </div>
                <div className="col-md-10 row" >
                    {travels.map((e) => {
                        return <TravelPackageCard
                            key={e.id}
                            destination={e.destination}
                            image={e.Images[0].imageUrl}
                            type={'all'}
                            onClick={() => navigate(`/detail/${e.id}`)}
                        />
                    })}

                </div>
            </div>

        </div>
    )
}
