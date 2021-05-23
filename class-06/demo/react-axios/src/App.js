import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      locData:'',
      displayMap:false,
      errorMessage:false
    }
  }

  getLocation = async(e) =>{
    e.preventDefault();


    let LocUrl = `https://eu1.locationiq.com/v1/search.php?key=f5de8e48adbdc6&q=${this.state.searchQuery}&format=json`;

    try {
      let locResult = await axios.get(LocUrl);
      // console.log(locResult.data[0]);
      
      this.setState({
        locData:locResult.data[0],
        displayMap:true
      })
  
      console.log(this.state.locData);
    }
    catch {
      this.setState({
        displayMap:false,
        errorMessage:true
      })
    }

  }

  updateSearchQuery = (event) =>{
    this.setState({
      searchQuery: event.target.value
    })
    console.log(this.state.searchQuery);
  }


  render() {
    return (
      <>
        <h1>City Explorer</h1>
        {/* <button onClick={this.getLocation}>Search Location</button> */}
        <form onSubmit={this.getLocation}>
          <input type='text' placeholder='add a city' onChange={this.updateSearchQuery}/>
          {/* <button>submit</button> */}
          <input type='submit' value='Get Location'/>
        </form>

        <p>{this.state.locData.display_name}</p>

      { this.state.displayMap &&
        <img
        src={`https://maps.locationiq.com/v3/staticmap?key=f5de8e48adbdc6&center=${this.state.locData.lat},${this.state.locData.lon}`} alt=''
        />
      }
{/* 
      {this.state.errorMessage &&
        <p>error in getting thr data</p>
      } */}

      </>
    )
  }
}

export default App;
