import React from "react";
import'./AjaxApi.css'

function Pokemon (props){
  return <figure>
    <img src={props.avatar} alt={props.name}></img>
    <figcaption>name : {props.name}</figcaption>
    <span>type : {props.type}</span>
    <span className="attack">attack: {props.attack}</span>
    
  </figure>
}

class AjaxApiPokemon extends React.Component{
  state = {
    pokemons :[],
  };

  componentDidMount() {
    let url = "https://pokeapi.co/api/v2/pokemon/";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        json.results.forEach((el) => {
          fetch(el.url)
            .then((res) => res.json())
            .then((json) => {
              console.log(json);
              let pokemon = {
                id:json.id,
                name:json.name,
                avatar:json.sprites.front_default,
                type:json.types[0].type.name,
                attack:json.stats[1].base_stat
              };

              let pokemons=[...this.state.pokemons, pokemon];
              this.setState({pokemons});
            });
        })
      })
  }

  render() {
    return (
      <div className="Container">
        <h2>Minimal Pokedex</h2>
        <div className="Containers__pokemons">
        {this.state.pokemons.length === 0 ? (
          <h3>loading...</h3>
        ) : (
          this.state.pokemons.map((el) => (
            <Pokemon key={el.id} name={el.name} avatar={el.avatar} type ={el.type} attack={el.attack}/>
          ))
        )}
        </div>
      </div>
    );
  }
}

export default AjaxApiPokemon;