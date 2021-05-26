import React from 'react';
import axios from 'axios';

import Map from './components/Map'; 
import Weather from './components/Weather';


export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locData: '',
      searchQuery: '',
      show: false,
      errorMsg: false,
      weatherData: [],
      errorMsgWeather: false,
      showWeather: false,
      moviesData: [],
      errorMsgMovie: false
    }
  }


  getLocation = async (e) => {
    e.preventDefault();
    console.log(process.env);
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

    try {
      let locResult = await axios.get(url);
      console.log(locResult.data[0].display_name);
      this.setState({
        locData: locResult.data[0],
        show: true,
        errorMsg: false
      })
      console.log(this.state.locData)
    }
    catch {
      this.setState({
        show: false,
        errorMsg: true
      })
    }

    console.log(this.state.searchQuery);
    this.displayWeather(this.state.searchQuery)
    this.displayMovies(this.state.searchQuery)
  }

  displayWeather = async (city) => {
    try {
      // const weather = await axios.get(`${process.env.REACT_APP_SERVER}/weather`, { params: { latitude: lat, longitude: lon, searchQuery: this.state.searchQuery } });
      const weather = await axios.get(`${process.env.REACT_APP_SERVER}/weather`, { params: { searchQuery: city } });
      this.setState({
        weatherData: weather.data,
        showWeather: true,
        errorMsgWeather: false
      })
    } catch (error) {
      this.setState({
        errorMsgWeather: true,
        showWeather: false
      })
    }
  }

  displayMovies = async (city) => {
    try {
      const movie = await axios.get(`${process.env.REACT_APP_SERVER}/movie`, { params: { searchQuery: city } });
      this.setState({
        moviesData: movie.data,
        errorMsgMovie: false
      })
    } catch (error) {
      this.setState({
        errorMsgMovie: true
      })
    }
  }


  updateSearchQuery = (e) => {
    this.setState({
      searchQuery: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>City Explorer</h1>

        <form onSubmit={this.getLocation}>
          <input onChange={this.updateSearchQuery} type='text' placeholder='city name' />
          <input type="submit" value='get city' />
        </form>


        {/* LOCATION */}
        <p>
          {this.state.locData.display_name}
        </p>

        <br />

        {this.state.show &&
          <Map
            img_url={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.locData.lat},${this.state.locData.lon}&zoom=10`}
            city={this.state.location}
          />
        }


        {this.state.errorMsg &&
          <p>Error in getting the location data</p>
        }

        <hr />
        {/* WEATHER */}
        {this.state.showWeather &&
          <Weather
            weatherData={this.state.weatherData}
          />
        }

        {this.state.errorMsgWeather &&
          <p>Error in getting the weather data</p>
        }

        {/* MOVIES */}
        <hr />
        {this.state.moviesData.map((movie, index) => (
          <div key={index}>
            <p>Movie Title: {movie.title}</p>
            {/* <p>description: {movie.description}</p> */}
          </div>
        ))}

        {this.state.errorMsgMovie &&
          <p>Error in getting the Movies data</p>
        }

      </div>
    )
  }
}

export default App;
