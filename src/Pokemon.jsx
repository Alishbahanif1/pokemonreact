import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import SweetAlert from 'sweetalert2';

const Pokemon=()=> {
    const [pokemons, setPokemons] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [selectedPokemon, setSelectedPokemon] = useState(null); 
  useEffect(() => {
    // Fetch the Pokémon list
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then((response) => response.json())
      .then((data) => {
        const pokemonDetails = [];
        setLoading(true); // Set loading to true while fetching data
  
        // Loop through each Pokémon and fetch details sequentially
        for (let i = 0; i < data.results.length; i++) {
          fetch(data.results[i].url)
            .then((res) => res.json())
            .then((pokemonData) => {
              // Add the fetched data to pokemonDetails
              pokemonDetails.push({
                name: data.results[i].name,
                image: pokemonData.sprites.front_default,
                id: pokemonData.id,
                weight: pokemonData.weight,
                height: pokemonData.height,
                abilities: pokemonData.abilities.map((ability) => ability.ability.name).join(', '),
                moves: pokemonData.moves.slice(0, 5).map((move) => move.move.name).join(', '), // First 5 moves
           
              });
  
              // Once all the data is fetched, update the state
              if (pokemonDetails.length === data.results.length) {
                setPokemons(pokemonDetails);
                setLoading(false);
              }
            })
            .catch((err) => {
             
            });
        }
      })
      .catch((err) => {
       
      });
     
  }, []);
  //using sweet alert
  const handlePokemonClick = (pokemon) => {
    SweetAlert.fire({
      title: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1), // Capitalize the name
      html: `
        <img src="${pokemon.image}" alt="${pokemon.name}" width="200" />
        <p><strong>Weight:</strong> ${pokemon.weight}</p>
        <p><strong>Height:</strong> ${pokemon.height}</p>
        <p><strong>Abilities:</strong> ${pokemon.abilities}</p>
        <p><strong>Moves:</strong> ${pokemon.moves}</p>
      `,
      imageAlt: `${pokemon.name} image`,
      confirmButtonText: 'Close',
  });}
  return (
    
      <div className="container">
      <h1 className='text-center mb-5 mt-5'>Pokémon List</h1>
      <div className="pokemon-list row" >
        {pokemons.map((pokemon) => (
          <div onClick={() => handlePokemonClick(pokemon)} key={pokemon.id} className="col-sm-3 ">
            <img src={pokemon.image} alt={pokemon.name} className="img-fluid" />
            <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
          </div>
        ))}
      </div>
    </div>
  
  )
}

export default Pokemon
