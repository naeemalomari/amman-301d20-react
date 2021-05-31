'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

// connect express server to mongodb server
mongoose.connect('mongodb://localhost:27017/cats',
    { useNewUrlParser: true, useUnifiedTopology: true }); //deprecation warnings


//  create collections
//  create schema and model
// Schema: determines how the shape of our data will look like (blueprint)
const kittySchema = new mongoose.Schema({
    catName: String,
    breed: String
});

const ownerSchema = new mongoose.Schema({
    ownerName: String,
    cats: [kittySchema] //
})

// build a model from our schema
// schema: drawing phase
// model: creation phase
const myCatModel = mongoose.model('kitten', kittySchema);
const myOwnerModel = mongoose.model('owner', ownerSchema)

function seedKittenCollection() {
    const sherry = new myCatModel({
        catName: 'sherry',
        breed: 'angora'
    })
    const mefleh = new myCatModel({
        catName: 'mefleh',
        breed: 'persian'
    })

    console.log(sherry)
    console.log(mefleh)

    //  to actually save them >> save()
    sherry.save();
    mefleh.save();
}

// seedKittenCollection();


function seedOwnerCollection() {
    const razan = new myOwnerModel({
        ownerName: 'razan',
        cats: [
            {
                catName: 'fluffy',
                breed: 'angora'
            },
            {
                catName: 'em zeki',
                breed:'persian'
            }
        ]
    })

    razan.save();
}

// seedOwnerCollection();


// proof of life
app.get('/', homePageHandler);
app.get('/cat',getCatsHandler);


function homePageHandler(req, res) {
    res.send('you are doing great')
}

// http://localhost:3001/cat?name=razan
function getCatsHandler(req,res) {
    let ownerName2 = req.query.name;
    // let {name} = req.query
    myOwnerModel.find({ownerName:ownerName2},function(err,ownerData){
        if(err) {
            console.log('did not work')
        } else {
            console.log(ownerData)
            console.log(ownerData[0])
            console.log(ownerData[0].cats)
            res.send(ownerData[0].cats)
        }
    })
}

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})