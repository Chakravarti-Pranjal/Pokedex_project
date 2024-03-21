import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';

const PokemonList = () => {

    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    // const [ pokedexUrl, setPokedexUrl ] = useState("https://pokeapi.co/api/v2/pokemon") ;

    // const [nextUrl, setNextUrl] = useState(' ') ;
    // const [prevUrl, setPrevUrl] = useState(' ');

    const [pokemonListState, setPokemonListState] = useState({
      pokemonList : [] ,
      isLoading : true,
      pokedexUrl : "https://pokeapi.co/api/v2/pokemon" ,
      nextUrl : '' ,
      prevUrl : ''
    });

    async function downloadPokemons(){
        // setIsLoading(true);
        setPokemonListState({...pokemonListState, isLoading : true});

        // this download list of 20 pokemons
        //  const response = await axios.get(pokedexUrl);
         const response = await axios.get(pokemonListState.pokedexUrl);

        //  we get the array of pokemon
       const pokemonResult = response.data.results;
       console.log(response.data);

       setPokemonListState((state) => ({
        ...state, 
        nextUrl : response.data.next , 
        prevUrl : response.data.previous
      }));
      //  setPrevUrl(response.data.previous);

    //    iterating over the array of pokemons and using their url, to create an array 
       const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));

    //    passing that promise array to axios.all
       const pokemonData = await axios.all(pokemonResultPromise);
       console.log(pokemonData);

    //    now iterate on the data of each pokemon
       const pokeListResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return { 
            id : pokemon.id,
             name: pokemon.name, 
             image: (pokemon.sprites.other) ?pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
             type: pokemon.types
            }
       });

       console.log(pokeListResult);
       
       setPokemonListState((state) => ({
        ...state , 
        pokemonList : pokeListResult, 
        isLoading : false}));
      //  setIsLoading(true);
    } ;

    useEffect( ()=> {
      downloadPokemons();
    }, [pokemonListState.pokedexUrl]);


  return (
    <div className='pokemon-list-wrapper'>
        <div className='pokemon-wrapper'>
            {(pokemonListState.isLoading) ? 'Loading.....' : 
        pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
        }
        </div>

        <div className='controls'>
        <button disabled={pokemonListState.prevUrl == null} onClick={() => {     
          const urlToSet = pokemonListState.prevUrl ;
          setPokemonListState({...pokemonListState, pokedexUrl : urlToSet })}}
>Prev</button>
       
        <button disabled={pokemonListState.nextUrl == null} onClick={() => {
             const urlToSet = pokemonListState.nextUrl ;
          setPokemonListState({...pokemonListState, pokedexUrl : urlToSet })}}>Next</button>
        </div>
    </div>
  )
}

export default PokemonList
