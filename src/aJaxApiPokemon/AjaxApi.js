import React from "react";
import "./AjaxApi.css";

function Pokemon(props) {
  return (
    <figure>
      <img src={props.avatar} alt={props.name} />
      <figcaption>Name: {props.name}</figcaption>
      <span>Type: {props.type}</span>
      <span className="attack">Attack: {props.attack}</span>
    </figure>
  );
}

class AjaxApiPokemon extends React.Component {
  state = {
    pokemons: [],
    loading: true,
    error: null,
  };

  async componentDidMount() {
    const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"; // Cambiado a 151
    try {
      const res = await fetch(url);
      const data = await res.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (el) => {
          const res = await fetch(el.url);
          const pokemon = await res.json();
          return {
            id: pokemon.id,
            name: pokemon.name,
            avatar: pokemon.sprites.front_default,
            type: pokemon.types[0]?.type.name || "Unknown", // Manejo de tipos faltantes
            attack: pokemon.stats[1]?.base_stat || 0, // Manejo de ataques faltantes
          };
        })
      );

      this.setState({ pokemons: pokemonDetails, loading: false });
    } catch (error) {
      this.setState({ error: "Failed to fetch Pokémon data.", loading: false });
    }
  }

  render() {
    const { pokemons, loading, error } = this.state;

    return (
      <div className="Container">
        <h2>Minimal Pokedex</h2>
        <div className="Containers__pokemons">
          {loading && <h3>Loading...</h3>}
          {error && <h3>{error}</h3>}
          {!loading &&
            !error &&
            pokemons.map((el) => (
              <Pokemon
                key={el.id}
                name={el.name}
                avatar={el.avatar}
                type={el.type}
                attack={el.attack}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default AjaxApiPokemon;
