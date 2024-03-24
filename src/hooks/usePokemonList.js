import {useState, useEffect} from 'react'
import axios from 'axios';

const usePokemonList = (type) => {

     const [pokemonListState, setPokemonListState] = useState({
      pokemonList : [] ,
      isLoading : true,
      pokedexUrl : "https://pokeapi.co/api/v2/pokemon"  ,
      nextUrl : '' ,
      prevUrl : '',
      type : ''
    });

    const response = '' ;

      async function downloadPokemons(){

    // iterating over the array of pokemons and using their url, to create an array 
    if(pokemonListState.type){
        setPokemonListState((state) => ({...state, pokemonList : response.data.pokemon.slice(0,5)
        }) )
    } else {

        setPokemonListState((state) => ({ ...state , isLoading : true }));

      //    this downloads list of 20 pokemons
          const response = await axios.get(pokemonListState.pokedexUrl);

          //  we get the array of pokemon
        const pokemonResult = response.data.results;
        console.log(pokemonListState);

        setPokemonListState((state) => ({
          ...state, 
          nextUrl : response.data.next , 
          prevUrl : response.data.previous
        }));

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
        } 
    }

    useEffect( ()=> {
      downloadPokemons();
    }, [pokemonListState.pokedexUrl]);


  return  [ pokemonListState, setPokemonListState ]
}

export default usePokemonList
