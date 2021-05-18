import React from 'react';
import ChildCat from './ChildCat';
import sherry from './assets/sherry2.jpg'

class Parent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Sherry',
            imgUrl: sherry,
            numberofCannedTunaCabinet:15
        }
    }

    giveTuna =() =>{
        this.setState({
            numberofCannedTunaCabinet:this.state.numberofCannedTunaCabinet-1
        })
    }

    render() {
        return (
            <>
                <h2>parent</h2>

                <p>Number of Canned Tuna in Cabinet {this.state.numberofCannedTunaCabinet}</p>
                <ChildCat
                    catName={this.state.name}
                    imgUrll={this.state.imgUrl}
                    giveMeTuna ={this.giveTuna}
                    />

                <ChildCat
                    catName={this.state.name}
                    imgUrll={this.state.imgUrl} 
                    giveMeTuna ={this.giveTuna}/>
            </>
        )
    }
}

export default Parent;