'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('home route')
})

// localhost:3001/photo?searchQuery=book
app.get('/photo', photoHandler)
// app.get('/location',locationHandler)
// app.get('/weather',wearherHandler)
// app.get('/movies',moviesHandler)

function photoHandler(req, res) {
    let photoQuery = req.query.searchQuery;
    // res.send(photoQuery)
    let key = process.env.UNSPLASH_KEY;
    let url = `https://api.unsplash.com/search/photos?query=${photoQuery}&client_id=${key}`;

    // try{
    //     const result = await axios.get(url);
    //     console.log('in axios')
    //     const photoArray = result.data.results.map(photoItem=>{
    //         return new Photo(photoItem)
    //     })
    //     res.send(photoArray);
    // } catch(error) {
    //     console.log(error)
    //     res.status(500).send(`error in getting the photo data ==> ${error}`);
    // }

    // try {
    //     axios.get(url).then(result => {
    //         console.log('inside promise')
    //         const photoArray = result.data.results.map(photoItem => {
    //             return new Photo(photoItem)
    //         })
    //         res.send(photoArray);
    //     })
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).send(`error in getting the photo data ==> ${error}`);
    // }

    // console.log('after aaxios');


    axios
        .get(url)
        .then(result => {
            console.log('inside promise')
            const photoArray = result.data.results.map(photoItem => {
                return new Photo(photoItem)
            })
            res.send(photoArray);
        })
        .catch(err => {
            res.status(500).send(`error in getting the photo data ==> ${err}`);
        })

    console.log('after aaxios');
}

class Photo {
    constructor(item) {
        this.imgUrl = item.urls.raw;
        this.noLikes = item.likes;
    }
}
// localhost:3001/gfhsf
app.get('*', (req, res) => {
    res.status(404).send('not found')
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
