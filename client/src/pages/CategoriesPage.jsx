import React, { useEffect, useState } from 'react'
import { api } from '../utils/api';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { fetchCategories } from '../store';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);

    const categoriesRedux = useSelector((state) => state.categories);

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

    useEffect(() => {
        // getCategories();
        dispatch(fetchCategories());
    }, [])
    return (
        <div style={{ height: '100vh', padding: '30px' }}>
            <h2>Categories</h2>
            <hr />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" style={{ width: 40 }}>#</th>
                        <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {categoriesRedux.map((e, i) => {
                        return <tr key={e.id}>
                            <td>{i+1}</td>
                            <td>{e.category}</td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    )
}
