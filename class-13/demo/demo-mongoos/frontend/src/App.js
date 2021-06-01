import React, { Component } from 'react'
import Cats from './Cats'; // responsible for displaying the cats data
import Form from './Form'; // display the form for sending the data to the backend
import axios from 'axios';
import AddCatForm from './AddCatForm';


class App extends Component {

  //  TODO: get a list of cats from the backend
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      name: '',
      catName:'',
      catBreed:'',
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
    console.log(this.state.name);
  }
  updateCatName = (event) => {
    this.setState({
      catName: event.target.value
    })
  }
  updateCatBreed = (event) => {
    this.setState({
      catBreed: event.target.value
    })
  }

  addCat = async(event) =>{
    event.preventDefault();
    // const newCat = await axios.get(`${this.state.server}/addCat?catName=${this.state.catName}&catBreed=${this.state.catBreed}&ownerName=${this.state.name}`)
    const catFormData = {
      catName: this.state.catName,
      catBreed:this.state.catBreed,
      ownerName:this.state.name
    }
    const newCats = await axios.post(`${this.state.server}/addCat`,catFormData)
    // const newCat = await axios.get(`${this.state.server}/addCat`,{params:catFormData})
    this.setState({
      cats:newCats.data
    })

  }

  deleteCat = async(index) =>{
    const ownerName = {
      name:this.state.name
    }
    let newCats = await axios.delete(`${this.state.server}/deleteCat/${index}`,{params:ownerName})

    this.setState({
      cats:newCats.data
    })

  }



  render() {
    return (
      <>
        <div>
          <Cats
            cats={this.state.cats}
            showCatsComponent={this.state.showCatsComponent}
            deleteCatProps={this.deleteCat}
          />
          <Form
            updateName={this.updateName}
            getCats={this.getCats}
          />
          <AddCatForm
          updateCatNameProps = {this.updateCatName}
          updateCatBreedProps = {this.updateCatBreed}
          addCatProps = {this.addCat}
          />
        </div>
      </>
    )
  }
}

export default App;
