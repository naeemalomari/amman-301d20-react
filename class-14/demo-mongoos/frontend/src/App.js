import React, { Component } from 'react'
import Cats from './Cats'; // responsible for displaying the cats data
import Form from './Form'; // display the form for sending the data to the backend
import axios from 'axios';
import AddCatForm from './AddCatForm';
import UpdateCatForm from './UpdateCatForm';


class App extends Component {

  //  TODO: get a list of cats from the backend
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      name: '',
      catName: '',
      catBreed: '',
      index:0,
      showCatsComponent: false,
      server: process.env.REACT_APP_SERVER_URL,
      showUpdateStatus: false
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

  addCat = async (event) => {
    event.preventDefault();
    // const newCat = await axios.get(`${this.state.server}/addCat?catName=${this.state.catName}&catBreed=${this.state.catBreed}&ownerName=${this.state.name}`)
    const catFormData = {
      catName: this.state.catName,
      catBreed: this.state.catBreed,
      ownerName: this.state.name
    }
    const newCats = await axios.post(`${this.state.server}/addCat`, catFormData)
    // const newCat = await axios.get(`${this.state.server}/addCat`,{params:catFormData})
    this.setState({
      cats: newCats.data
    })

  }

  deleteCat = async (index) => {
    const ownerName = {
      name: this.state.name
    }
    let newCats = await axios.delete(`${this.state.server}/deleteCat/${index}`, { params: ownerName })

    this.setState({
      cats: newCats.data
    })

  }

  updateCat = async (e) =>{
    e.preventDefault();
    const catData = {
      catName:this.state.catName,
      catBreed:this.state.catBreed,
      ownerName:this.state.name
    }
    let catsData = await axios.put(`${this.state.server}/updateCat/${this.state.index}`,catData)
    this.setState({
      cats:catsData.data
    })
  }

  showUpdateForm = (idx) => {

    const chosenCat = this.state.cats.filter((val,index)=>{
      return idx === index;
    })

    console.log(chosenCat);

    this.setState({
      showUpdateStatus: true,
      index:idx,
      catName: chosenCat[0].catName,
      catBreed:chosenCat[0].breed
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
            showUpdateFormProps={this.showUpdateForm}
          />
          <Form
            updateName={this.updateName}
            getCats={this.getCats}
          />
          <AddCatForm
            updateCatNameProps={this.updateCatName}
            updateCatBreedProps={this.updateCatBreed}
            addCatProps={this.addCat}
          />
          {this.state.showUpdateStatus &&
            <UpdateCatForm
              catName={this.state.catName}
              catBreed={this.state.catBreed}
              updateCatNameProps={this.updateCatName}
              updateCatBreedProps={this.updateCatBreed}
              updateCat={this.updateCat}
            />
          }

        </div>
      </>
    )
  }
}

export default App;
