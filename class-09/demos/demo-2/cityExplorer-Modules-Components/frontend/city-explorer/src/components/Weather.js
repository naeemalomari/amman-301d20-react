import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';


class Weather extends React.Component {
    render() {
        return (
            <div id="weather">
                <CardDeck style={{ width: '18rem' },{backgroundColor:'orange'}}>
                    <h3>Weather:</h3>
                    {this.props.weatherData.map((day, idx) => (
                        <Card style={{ width: '18rem' }}>
                            <Card.Header>{day.date}</Card.Header>
                            <Card.Body>
                                <Card.Title>{day.description}</Card.Title>
                            </Card.Body>
                        </Card>
                    ))
                    }
                </CardDeck>
            </div>
        )
    }
}

export default Weather;
