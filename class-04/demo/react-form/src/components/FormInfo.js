import React from 'react';
import {Button,Modal} from 'react-bootstrap/'

class FormInfo extends React.Component {

    handleCloseForm = () =>{
        this.props.handleClose()
    }
    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.handleCloseForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.name}</p>
                        <p>{this.props.age}</p>
                        <p>{this.props.favProgLang}</p>
                        <p>Do i like cats1: { this.props.likeCats ? 'yes':'no'}</p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default FormInfo;
