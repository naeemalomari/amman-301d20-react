import React, { Component } from 'react'

export class Cats extends Component {
    render() {
        return (
            <>
                { this.props.showCatsComponent &&
                    this.props.cats.map((cat, idx) => {
                        return (
                            <div key={idx}>
                                {cat.catName}
                                <button onClick={()=>this.props.deleteCatProps(idx)}>Delete</button>
                            </div>
                        )
                    })
                }
            </>
        );
    }
}

export default Cats
