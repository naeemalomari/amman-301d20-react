import React from 'react';
import axios from 'axios';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokeInfo:{}
    }
  }


  getPokemonData = async () =>{
    let serverRoute = process.env.REACT_APP_SERVER;
    // http://localhost:3001/test
    // const url = `${serverRoute}/test`;

    // http://localhost:3001/getPoke?pokeName=bulbasaur
    const url = `${serverRoute}/getPoke?pokeName=bulbasaur`;
    // console.log(url);
    const pokemonItem = await axios.get(url);
    console.log(pokemonItem.data);
    this.setState({
      pokeInfo:pokemonItem.data
    })


  }

  render() {
    return (
      <>
        <h1>Front end website</h1>
        <button onClick={this.getPokemonData}> Get Poke data</button>
        <p>{this.state.pokeInfo.name}</p>
      </>
    )
  }
}

export default App
