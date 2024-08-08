import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminHomeTableItem({index, destination, price, capacity, booked, category, onClickDel, onClickEdit, onClickInfo}) {
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{destination}</td>
            <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)}</td>
            <td>{booked} / {capacity}</td>
            <td>{category}</td>
            <td>
                <span className="d-flex">
                    <Link onClick={onClickInfo} className="ms-3 tooltips"><span className="icon material-symbols-outlined text-danger">info</span> <span className="tooltiptext">Travel Info</span></Link>
                    <Link onClick={onClickDel} className="ms-3 tooltips"><span className="icon material-symbols-outlined text-danger">delete</span><span className="tooltiptext">Delete Travel</span></Link>
                    <Link onClick={onClickEdit} className="ms-3 tooltips"><span className="icon material-symbols-outlined text-danger">edit</span><span className="tooltiptext">Edit Travel</span></Link>
                </span>
            </td>
        </tr>
    )
}
