'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const weather = require('./modules/weather.js');
const handleMovie = require('./modules/movies.js')


const PORT = process.env.PORT;
const server = express();
server.use(cors());

server.get('/', (req, res) => {
    res.send('home route')
})

server.get('/weather', handleWeather);
server.get('/movie', handleMovie);

// localhost:3000/weather?searchQuery=amman
function handleWeather(request, response) {
    let city= request.query.searchQuery;
    weather(city)
      .then(summaries => response.send(summaries))
      .catch((error) => {
        console.error(error);
        response.status(500).send('Sorry. Something went wrong!')
      });
}


function errorHandler(error, response) {
    response.status(500).send(`something went wrong ==> ${error}`);
}

server.get('*', (request, response) => {
    response.status(404).send('not found');
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
