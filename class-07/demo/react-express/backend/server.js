'use strict';


require('dotenv').config(); // npm i dotenv
const express = require('express'); //npm i express
const pokeData = require('./assets/poke.json')
const cors = require('cors');

const server = express();
server.use(cors()); //  make my server opened for anyone

// const PORT = 3001;
const PORT = process.env.PORT;

// http://localhost:3001/
server.get('/', (req, res) => {
    res.send('home route')
})

// http://localhost:3001/test
server.get('/test', (request, response) => {
    let str = 'hello from back end';
    response.status(200).send(str);
})

// // http://localhost:3001/getPoke
// server.get('/getPoke',(req,res)=>{
//     console.log(pokeData);
//     let pokeNames = pokeData.results.map(item=>{
//         return item.name;
//     })
//     res.send(pokeNames)
// })

// http://localhost:3001/getPoke?pokeName=bulbasaur
server.get('/getPoke', (req, res) => {
    console.log(req.query)
    let pokeNameData= req.query.pokeName
    let pokeItem = pokeData.results.find(item => {
        if (item.name == pokeNameData)
            return item
    })
    res.send(pokeItem)
})


server.get('*', (req, res) => {
    res.send('not found');
})


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

