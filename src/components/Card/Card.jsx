import React from 'react'
import './card.scss'

const Card = ({card}) => {
  const {title,dec,log} = card
    return (
    <div className='card'>
        <div className="overflow">{log} </div>
        <h3 style={{color:"rgb(16, 240, 8)"}} className="text">{title}</h3>
        <p className="textContent">
            {dec}
        </p>
    </div>
  )
}

export default Card