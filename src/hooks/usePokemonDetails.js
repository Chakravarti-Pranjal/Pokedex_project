import {useEffect, useState} from 'react' ;
import axios from 'axios';

const usePokemonDetails = (id, pokemonName) => {

    const { pokemon, setPokemon } = useState({});

    async function downloadPokemon() {
      try {
          let response ;
          if(pokemonName){
              response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
          }
          else{
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          }

          const pokemonOfSameTypes = axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ' ' }`)
          console.log(pokemonOfSameTypes);

          setPokemon((state) => ({
              ...state ,
            name : response.data.name,
            image: response.data.sprites.other.dream_world.front_default ,
            weight: response.data.weight ,
            height: response.data.height , 
            types: response.data.types.map((t) => t.type.name),
            similarPokemons : pokemonOfSameTypes.data.pokemon
          }));
      
          pokemonOfSameTypes.then((response) => {
              setPokemon(state => ({
                  ...state,
                  similarPokemons : response.data.pokemon
              }));
          })
          
          console.log(response.data);
        setPokemonListState({...pokemonListState, type : response.data.types ? response.data.types[0].type.name : ' ' })
    
      } catch (error) {
        console.log('something went wrong');
      }
      
    }

            
    const [pokemonListState, setPokemonListState] = useState([]) ;

     useEffect(() => {
        downloadPokemon() ;
        //console.log(pokemonListHookResponse.pokemonListState);
    }, []) ;

  return [pokemon, pokemonListState]
}

export default usePokemonDetails
