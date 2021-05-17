import React from 'react';
import ChildCat from './ChildCat';
import sherry from './assets/sherry2.jpg'

class Parent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Sherry',
            imgUrl: sherry
        }
    }


    render() {
        return (
            <>
                <h2>parent</h2>
                <ChildCat
                    catName={this.state.name}
                    imgUrll={this.state.imgUrl} />

                <ChildCat
                    catName={this.state.name}
                    imgUrll={this.state.imgUrl} />
            </>
        )
    }
}

export default Parent;