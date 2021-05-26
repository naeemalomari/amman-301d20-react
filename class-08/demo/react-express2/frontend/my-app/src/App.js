import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      photos: []
    }
  }

  updateSearchQuery = (e) => this.setState({ searchQuery: e.target.value });

  getPhotos = async (e) => {
    // localhost:3001/photo?searchQuery=book
    e.preventDefault();
    const SERVER_LINK = 'http://localhost:3001';
    const photosArray = await axios.get(`${SERVER_LINK}/photo?searchQuery=${this.state.searchQuery}`)
    this.setState({ photos: photosArray.data })

  }

  render() {
    return (
      <>
        <Form onSubmit={this.getPhotos}>
          <Form.Group controlId="searchQuery">
            <Form.Label>Find Photos About...</Form.Label>
            <Form.Control onChange={this.updateSearchQuery} type="text" placeholder="Enter a search term" />
          </Form.Group>
          <Button type="submit">
            Submit
          </Button>
        </Form>

        {this.state.photos.map((photo, idx) => {
          return (
            <div key={idx}>
              <p>Number of likes: {photo.noLikes}</p>
              <p>image url: {photo.imgUrl}</p>
            </div>
          )

        })}

      </>
    )
  }
}

export default App;
