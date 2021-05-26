const axios = require('axios'); 

module.exports = handleWeather; 

function handleWeather(city) {
 const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_PRIVATE_KEY}`;

    return axios.get(url) 
        .then(results => {
            const weatherArray = results.data.data.map(day => new Forecast(day));
            return weatherArray
        })
}

function Forecast(day) {
    this.date = day.valid_date
    this.description = day.weather.description
}

// module.exports = {
//     handelWeather,
//     name: 'sherry'
// };