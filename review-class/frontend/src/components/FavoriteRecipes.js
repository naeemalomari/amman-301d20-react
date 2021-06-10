import React, { Component } from 'react';
import axios from 'axios';
import FavRecipe from './FavRecipe';
import UpdateForm from './UpdateForm';


class FavoriteRecipes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serverLink: process.env.REACT_APP_SERVER,
            recipes: [],
            showFavRecipes: false,
            showForm: false,
            // chosenRecipe:{}
            recipeName: '',
            recipeImage: '',
            index:0
        }
    }

    componentDidMount = async () => {
        const recipes = await axios.get(`${this.state.serverLink}/getFavoriteRecipies`)

        this.setState({
            recipes: recipes.data,
            showFavRecipes: true
        })
    }

    deleteRecipeFunc = async (index) => {
        const id = this.state.recipes[index]._id;
        const recipes = await axios.delete(`${this.state.serverLink}/deleteRecipe/${id}`);
        this.setState({
            recipes: recipes.data
        })
    }


    showUpdateFormFunc = (idx) => {

        // console.log('hhhhhhhhhhhhhh',idx)
        const chosenRecipe = this.state.recipes[idx];
        this.setState({
            showForm: true,
            recipeName: chosenRecipe.label,
            recipeImage: chosenRecipe.image,
            index:idx
        })
    }

    updateLabelFunc = (e=>this.setState({recipeName:e.target.value}))
    updateImageFunc = (e=>this.setState({recipeImage:e.target.value}))

    updateRecipe = async (e) =>{
        e.preventDefault();

        const id = this.state.recipes[this.state.index]._id;

        const recipeData = {
            recipeName: this.state.recipeName,
            recipeImage: this.state.recipeImage
        }

        let recipesUpdate = await axios.put(`${this.state.serverLink}/updateRecipe/${id}`,recipeData)

        // console.log('hhhhhhhhhhhhhh',recipesUpdate.data)
        this.setState({
            recipes:recipesUpdate.data
        })
    }


    render() {
        return (
            <div>
                <h2>Favorite page</h2>

                {this.state.showForm
                    &&
                    <UpdateForm 
                    recipeName={this.state.recipeName}
                    recipeImage={this.state.recipeImage}
                    updateLabelFunc = {this.updateLabelFunc}
                    updateImageFunc = {this.updateImageFunc}
                    updateRecipe = {this.updateRecipe}
                    />
                }

                {this.state.showFavRecipes
                    && this.state.recipes.map((recipe, idx) => {
                        return (
                            <FavRecipe
                                index={idx}
                                recipe={recipe}
                                deleteRecipe={this.deleteRecipeFunc}
                                updateRecipe={this.showUpdateFormFunc}
                            />
                        )
                    })}
            </div>
        )
    }
}

export default FavoriteRecipes;
