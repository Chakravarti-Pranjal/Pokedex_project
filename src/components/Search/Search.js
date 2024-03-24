import React from 'react'
import './Search.css'
import useDebounce from '../../hooks/useDebounce'

const Search = ({updateSearchTerm}) => {

  const debouncedCallback = useDebounce((e) => updateSearchTerm(e.target.value))

  return (
    <div className='search-wrapper'>
      <input type="text" 
      placeholder='pokemon name....' 
      id='pokemon-name-search'
      onChange={(e) => debouncedCallback(e, '123')}
      />
    </div>
  )
}

export default Search
