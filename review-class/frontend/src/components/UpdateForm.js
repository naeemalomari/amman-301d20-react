import React, { Component } from 'react'

class UpdateForm extends Component {
    render() {
        return (
            <>
                <form onSubmit={e=>this.props.updateRecipe(e)}>
                    <label>Recipe Name:</label>
                    <input type='text' value={this.props.recipeName} onChange={this.props.updateLabelFunc}/>
                    <label>Recipe Image:</label>
                    <input type='text' value={this.props.recipeImage} onChange={this.props.updateImageFunc}/>
                    <input type='submit' value='Update Task'/>
                </form>
            </>
        )
    }
}

export default UpdateForm
