import React from 'react'
import './Pokemon.css'
import { Link } from 'react-router-dom' ;

const Pokemon = ({ name, image, id }) => {
  return (
    <div className='pokemon'>

    <Link to={`/pokemon/${id}`} >

      <div className='pokemon-name'>{name}</div>
      <div ><img src={image} alt="" className='pokemon-img' /></div>
    
    </Link>
      </div>
  )
}

export default Pokemon
