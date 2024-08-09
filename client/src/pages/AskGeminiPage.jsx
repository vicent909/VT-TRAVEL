import React, { useEffect, useState } from 'react'
import { api } from '../utils/api';
import Swal from 'sweetalert2';

export default function AskGeminiPage() {
    const [travels, setTravels] = useState([]);
    const [destination1, setDestination1] = useState("");
    const [destination2, setDestination2] = useState("");
    const [dataFirst, setDataFirst] = useState({});
    const [dataSecond, setDataSecond] = useState({});
    const [isShow, setIsShow] = useState(false)

    const getTravel = async () => {
        try {
            const { data } = await api({
                url: '/travels',
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

    const askGemini = async (e) => {
        e.preventDefault()
        if (destination1 !== "" || destination2 !== "") {
            try {
                const { data } = await api({
                    method: 'POST',
                    url: '/travels/gemini',
                    data: {
                        destination1: destination1,
                        destination2: destination2
                    }
                })

                setDataFirst(data.first)
                setDataSecond(data.second)

                setIsShow(true)
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please Select Destination'
            })
        }
    }

    useEffect(() => {
        getTravel();
    }, [])
    return (
        <div className='container' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card card-ask-gemini">
                <h3>Ask Gemini to Compare Your Destination</h3>
                <hr />
                <form onSubmit={(e) => askGemini(e)}>
                    <div className='d-flex gap-4 align-items-center'>
                        <select name="destination1" id="destination1" className='form-select' value={destination1} onChange={(e) => setDestination1(event.target.value)}>
                            <option value="">Select Destination 1</option>
                            {
                                travels.map((e) => {
                                    return <option key={e.id} value={e.destination}>{e.destination}</option>
                                })
                            }
                        </select>
                        <span className="material-symbols-outlined">
                            swap_horiz
                        </span>
                        <select name="destination2" id="destination2" className='form-select' value={destination2} onChange={(e) => setDestination2(event.target.value)}>
                            <option value="">Select Destination 2</option>
                            {
                                travels.map((e) => {
                                    return <option key={e.id} value={e.destination}>{e.destination}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='d-flex gap-4 align-items-center mt-4'>
                        <button className='btn btn-outline-secondary' style={{ width: "50%", borderRadius: 30 }}>Back to Home</button>
                        <div></div>
                        <button type='submit' className='btn-detail-join' style={{ width: '50%' }}>Compare</button>
                    </div>
                </form>
            </div>
            {isShow === true &&
                <div>
                    <hr />
                    <div className="row">
                        <div className="col-md-6 ">
                            <div className="card card-ask-gemini2">
                                <h3>{dataFirst.nama}</h3>
                                <hr />
                                <h5>Tempat Wisata:</h5>
                                <ul>
                                    {dataFirst.tempatWisata.map((e) => {
                                        return <li>{e}</li>
                                    })}
                                </ul>
                                <h5>Keunggulan:</h5>
                                <ul>
                                    {dataFirst.keunggulan.map((e) => {
                                        return <li>{e}</li>
                                    })}
                                </ul>
                                <h5>Kekurangan:</h5>
                                <ul>
                                    {dataFirst.kekurangan.map((e) => {
                                        return <li>{e}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className="card card-ask-gemini2">
                                <h3>{dataSecond.nama}</h3>
                                <hr />
                                <h5>Tempat Wisata:</h5>
                                <ul>
                                    {dataSecond.tempatWisata.map((e) => {
                                        return <li>{e}</li>
                                    })}
                                </ul>
                                <h5>Keunggulan:</h5>
                                <ul>
                                    {dataSecond.keunggulan.map((e) => {
                                        return <li>{e}</li>
                                    })}
                                </ul>
                                <h5>Kekurangan:</h5>
                                <ul>
                                    {dataSecond.kekurangan.map((e) => {
                                        return <li>{e}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
