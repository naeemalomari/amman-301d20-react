import React, { Component } from 'react'
import Cats from './Cats'; // responsible for displaying the cats data
import Form from './Form'; // display the form for sending the data to the backend
import axios from 'axios';


class App extends Component {

  //  TODO: get a list of cats from the backend
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      name: '',
      showCatsComponent: false,
      server: process.env.REACT_APP_SERVER_URL
    }
  }

  getCats = async (event) => {
    event.preventDefault();
    try {
      const paramsObj = {
        name: this.state.name
      }
      const cats = await axios.get(`${this.state.server}/cat`, { params: paramsObj });
      // const cats = await axios.get(`${this.state.server}/cat?name=${this.state.name}`);
      this.setState({
        cats: cats.data,
        name: '',
        showCatsComponent: true
      });
    } catch (error) {
      console.log(error);
    }
  }


  updateName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    return (
      <>
        <div>
          <Cats
            cats={this.state.cats}
            showCatsComponent={this.state.showCatsComponent}
          />
          <Form
            updateName={this.updateName}
            getCats={this.getCats}
          />
        </div>
      </>
    )
  }
}

export default App;
