import React from 'react'

const CarInfo = props => {
    return (
        <div className="sur-car-info">
            <p className="nam" >{props.name}</p>
            <p className="val">{props.value}</p>
        </div>
    )
}

export default CarInfo
