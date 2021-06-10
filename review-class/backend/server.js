'use strict';

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');


const server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost:27017/recipes2',
    { useNewUrlParser: true, useUnifiedTopology: true }); 

const recipeSchema = new mongoose.Schema({
    label: String,
    image:String,
    ingredientLines:Array
})

const myRecipeModel = mongoose.model('recipe',recipeSchema);


server.get('/', testHandler);
server.get('/recipes', recipesHandler);
server.post('/addToFavorite',favoriteHandler);
server.get('/getFavoriteRecipies',getFavoriteHandler);
server.delete('/deleteRecipe/:id',deleteHandler);
server.put('/updateRecipe/:id',updateHandler);


function testHandler(req, res) {
    res.send('test route')
}

function recipesHandler(req, res) {
    console.log(req.query);
    const ingredient = req.query.ingredient;
    const url = `https://api.edamam.com/search?q=${ingredient}&app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_APP_KEY}`;

    axios.get(url).then(result=>{
        // console.log(result.data.hits);
        const recipesArray = result.data.hits.map(recipe=>{
            // console.log(recipe)
            return new Recipe(recipe);
        })

        // console.log(recipesArray);
        res.send(recipesArray);
    })



}

function favoriteHandler(req,res) {
    console.log(req.body);
    const {label,image,ingredientLines} = req.body;

    const newRecipe = new myRecipeModel({
        label: label,
        image:image,
        ingredientLines:ingredientLines
    })
    
    newRecipe.save()

}

function getFavoriteHandler(req,res) {
    myRecipeModel.find({},(error,favData)=>{
        res.send(favData)
    })
}

function deleteHandler(req,res) {
    const id=req.params.id;
    myRecipeModel.remove({_id:id},(error,dataf)=>{
        myRecipeModel.find({},(error,data)=>{
            res.send(data)
        })
    })
}

function updateHandler(req,res) {
    const {recipeName,recipeImage} = req.body;
    const id = req.params.id;
    myRecipeModel.findOne({_id:id},(error,data1)=>{
        data1.label = recipeName;
        data1.image = recipeImage;
        data1.save().then(()=>{
            myRecipeModel.find({},(error,data)=>{
                res.send(data)
            })
        })
    })
}



class Recipe {
    constructor(data) {
        this.label = data.recipe.label;
        this.image = data.recipe.image;
        this.ingredientLines = data.recipe.ingredientLines;
    }
}

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
})