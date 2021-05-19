import React from 'react';
// import Form from 'react-bootstrap/Form';
import { Form, Button } from 'react-bootstrap/';
import FormInfo from './FormInfo';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            age:'',
            favProgLang:'Javascript',
            likeCats:false,
            show: false
        }
    }

    submitForm = (event) =>{
        event.preventDefault();
        // this.setState({
        //     name: event.target.name.value,
        //     age: event.target.age.value,
        //     favProgLang: event.target.favProgLang.value,
        //     likeCats: event.target.likeCats.checked
        // })
        this.setState({
            show:true
        })
    }
    
    updateName = (event) =>{
        this.setState({
            name:event.target.value
        })
        console.log(this.state.name);
    }

    updateAge = event => this.setState({age:event.target.value});
    updateLikeCats = event => this.setState({likeCats:event.target.checked});
    updateFavLang = event => this.setState({favProgLang:event.target.value});

    handleClose = () =>{
        this.setState({
            show:false
        })
    }

    render() {
        return (
            <>
                <p>in Main</p>

                <Form onSubmit={this.submitForm}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Enter Name" onChange={this.updateName}/>
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="text" name='age' placeholder="Enter Age" onChange={this.updateAge} />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" name='likeCats' label="Do you like cats?" onChange={this.updateLikeCats} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.SelectCustomHtmlSize">
                        <Form.Label>Select your favourite programming language</Form.Label>
                        <Form.Control as="select" custom name='favProgLang' onChange={this.updateFavLang}>
                            <option value='Javascript'>Javascript</option>
                            <option value='Csharp'>Csharp</option>
                            <option value='C++'>C++</option>
                            <option value='PHP'>PHP</option>
                            <option value='HTML'>HTML</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>



                <FormInfo
                name={this.state.name}
                age={this.state.age}
                favProgLang={this.state.favProgLang}
                likeCats={this.state.likeCats}
                show={this.state.show}
                handleClose={this.handleClose}
                />
            </>
        )
    }
}

export default Main;
