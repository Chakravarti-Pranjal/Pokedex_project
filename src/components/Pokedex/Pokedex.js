import React, { useState } from 'react'
import './Pokedex.css'
import Search from '../Search/Search'
import PokemonList from '../PokemonList/PokemonList'
import PokemonDetails from '../PokemonDetails/PokemonDetails'

const Pokedex = () => {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='pokedex-wrapper'>
    
     <Search updateSearchTer={setSearchTerm} />
    { (searchTerm.length === 0) ? <PokemonList /> : <PokemonDetails key={searchTerm} pokemonName={searchTerm} /> }
    </div>
  )
}

export default Pokedex
