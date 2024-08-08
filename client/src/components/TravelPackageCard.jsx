import React from 'react'

export default function TravelPackageCard({image, destination, type, onClick}) {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-4 container-travel-card" onClick={onClick}>
        <div className='card travel-card ' style={{backgroundImage: `url('${image}')`}}>
            <div className="travel-card-content">
                {type === 'all' ? 
                  <h2>{destination}</h2> :
                  <h1>{destination}</h1> 
                }
                <button className='btn-joinnow' onClick={onClick}>Join Now</button>
            </div>
        </div>
    </div>
  )
}
