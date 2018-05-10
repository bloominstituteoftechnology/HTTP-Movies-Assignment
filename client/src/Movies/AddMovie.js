import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state ={
            title: '',
            director: '',
            metascore: '',
            stars: ['Jean']
        }
    }
    
    render() {
        const { stars } = this.state;
        console.log(stars);
        return (
            <Form className="movie-card custom-form">
                <FormGroup row>
                    {/* <Label for="title">Add movie title: </Label> */}
                    <Col sm="10" >
                        <Input bsSize="lg" type="text" name="email" id="title" placeholder="Movie Title" />
                    </Col>
                </FormGroup>
                {/* <div className="movie-director">
                    Director: <em>{director}</em>
                </div> */}
                <FormGroup row>
                    <Label sm={2} for="director">Director:</Label>
                    <Col>
                    <Input sm={10} bsSize="sm" type="text" name="email" id="director" placeholder="Pepito Gutierrez" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} for="metascore">Metascore:</Label>
                    <Col>
                    <Input sm={10} bsSize="" type="number" name="email" id="metascore" placeholder="0" />
                    </Col>
                </FormGroup>


                {/* <div className="movie-metascore">
                    Metascore: <strong>{metascore}</strong>
                </div> */}
                <h3>Actors</h3>

                {stars.map(star => (
                    <div key={star} className="movie-star">
                    {star}
                    </div>
                ))}
                <FormGroup >
                    <Input bsSize="sm" type="text" name="email" id="director" placeholder="Pepito Gutierrez" />
                </FormGroup>
                <div className="save-button" onClick={this.saveMovie}>
                    Save
                </div>
            {/* </div> */}
            </Form>
        );
    }
}

export default AddMovie;