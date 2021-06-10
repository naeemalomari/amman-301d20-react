import React, { Component } from 'react';
import axios from 'axios';
import Recipe from './Recipe'


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serverLink: process.env.REACT_APP_SERVER,
            showRecipes: false,
            recipes: []
        }
    }


    componentDidMount = async () => {
        const recipes = await axios.get(`${this.state.serverLink}/recipes?ingredient=chicken`);
        console.log(recipes.data);

        this.setState({
            showRecipes: true,
            recipes: recipes.data
        })
    }

    addToFavFunc  = async(recipeData) =>{
        await axios.post(`${this.state.serverLink}/addToFavorite`,recipeData)
    }


    render() {
        return (
            <>
                <h2>home page</h2>
                {this.state.showRecipes &&
                    this.state.recipes.map((recipe, idx) => {
                        return (
                            <Recipe
                                recipe={recipe}
                                idx = {idx}
                                addToFav={this.addToFavFunc}
                            />
                        )

                    })
                }
            </>
        )
    }
}

export default Main;
