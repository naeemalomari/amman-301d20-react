import React from 'react';
import Board from './components/Board';
import Button from './components/Button';


class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <p>we want to go hoooome</p>
        {/* <button>submit</button> */}
        <Button/>
        <Board/>
      </div>
    )
  }

}

export default App;

