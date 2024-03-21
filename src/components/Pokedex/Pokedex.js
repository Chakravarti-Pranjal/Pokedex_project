import React from 'react'
import './Pokedex.css'
import Search from '../Search/Search'
import PokemonList from '../PokemonList/PokemonList'

const Pokedex = () => {
  return (
    <div className='pokedex-wrapper'>
    
     <Search />
     <PokemonList />
    </div>
  )
}

export default Pokedex
