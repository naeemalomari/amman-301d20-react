import React, { Component } from 'react'
import {Card,Button} from 'react-bootstrap'

class Recipe extends Component {
    render() {
        return (
            <Card style={{ width: '18rem' }} key ={this.props.idx}>
                <Card.Img variant="top" src={this.props.recipe.image} />
                <Card.Body>
                    <Card.Title>{this.props.recipe.label}</Card.Title>
                    <ul>
                        {this.props.recipe.ingredientLines.map((ingredient,idx)=>{
                            return(
                                <li>{ingredient}</li>
                            )
                        })}
                    </ul>
                    <Button variant="primary" onClick={()=>this.props.addToFav(this.props.recipe)}>Add to Fav</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default Recipe;
