import React from 'react'

export default function HomeCountItem({count, desc}) {
    return (
        <div className="col-md-4 home-count-item">
            <h1>{count}</h1>
            <h5 style={{color: '#646464'}}>{desc}</h5>
        </div>
    )
}
