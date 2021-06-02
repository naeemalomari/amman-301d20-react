import React, { Component } from 'react';

class AddCatForm extends Component {
    render() {
        return (
            <>
                <form onSubmit={(e)=>this.props.addCatProps(e)}>
                    <label>Cat Name</label>
                    <input type='text' onChange={(e)=>this.props.updateCatNameProps(e)}/>

                    <label>Cat Breed</label>
                    <input type='text' onChange={(e)=>this.props.updateCatBreedProps(e)}/>

                    <input type='submit' value='Add Cat'/>
                </form>
            </>
        )
    }
}

export default AddCatForm;
