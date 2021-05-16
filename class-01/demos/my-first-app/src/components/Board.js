import React from 'react';
import Square from './Square';

class Board extends React.Component {
    render() {
        return(
            <div>
                <h3>Board Game</h3>

                {/* <div className='square some-margin'>Square one</div>
                <div className='square some-margin'>Square Two</div>
                <div className='square some-margin'>Square Three</div>
                <div className='square some-margin'>Square Four</div>
                <div className='square some-margin'>Square Five</div> */}

                <Square squareNumber={'one'}/>
                <Square squareNumber={'two'}/>
                <Square squareNumber={'3'}/>
                <Square squareNumber={'4'}/>
                <Square squareNumber={'5'}/>

            </div>

        )
    }
}

export default Board;