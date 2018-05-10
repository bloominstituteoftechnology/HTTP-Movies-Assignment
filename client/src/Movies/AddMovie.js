import React, { Component } from 'react';
import { Col, Label, FormText, Button } from 'reactstrap';
    import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import axios from 'axios';

class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state ={
            title: '',
            director: '',
            metascore: '',
            stars: [],
            newStar: ''
        }

    }
    
    handleChange = e => {
        // console.log(e.target.name)
        this.setState({ [e.target.name]: e.target.value });
    }

    addStar = (e) => {
        // console.log(e.key);
        if (e.key === 'Enter' && this.state.newStar !== '') {
            // let copyStars = this.state.stars;
            // copyStars = copyStars.push(e.target.value);
            // console.log(copyStars);
            // this.setState({ stars: copyStars });

            /** modifico el array - No se ven cambios por que no se ha llamado render() */
            this.state.stars.push(this.state.newStar);
            /** setState llama render después de ejecutarse */
            this.setState({ newStar: '' });
        }
    }

    saveMovie = e => {
        // e.preventDefault();
        console.log(e);
        const {title,
            director,
            metascore,
            stars} = this.state;
        const newMovie = { title, director, metascore, stars };
        // console.log(newMovie);
        if (title !== '' &&
            director !== '' &&
            metascore !== '' &&
            stars.length > 0
        ) {
            axios.post('http://localhost:5000/api/movies', newMovie)
            .then( res => alert(`Your new movie was POSTED with an ${res.status}`))
            .catch( e => console.log(e) );
        } else { alert('To add a new Movie, all fields are required.')}


    }

    render() {
        const { title,
            director,
            metascore,
            stars,
            newStar } = this.state;
        console.log(title,
            director,
            metascore,
            newStar);
        return (
            <AvForm onChange={this.handleChange} className="movie-card custom-form">
                <AvGroup row>
                    {/* <Label for="title">Add movie title: </Label> */}
                    <Col sm="9" >
                        <AvInput required value={title} bsSize="lg" type="text" name="title" id="title" placeholder="Movie Title" />
                    </Col>
                </AvGroup>
                {/* <div className="movie-director">
                    Director: <em>{director}</em>
                </div> */}
                <AvGroup row>
                    <Label sm={2} for="director">Director:</Label>
                    <Col>
                    <AvInput required value={director} sm={10} bsSize="sm" type="text" name="director" id="director" placeholder="Pepito Gutierrez" />
                    </Col>
                </AvGroup>
                <AvGroup row>
                    <Label sm={2} for="metascore">Metascore:</Label>
                    <Col>
                    <AvInput required value={metascore} sm={10} bsSize="" type="number" name="metascore" id="metascore" placeholder="0" />
                    </Col>
                </AvGroup>


                {/* <div className="movie-metascore">
                    Metascore: <strong>{metascore}</strong>
                </div> */}
                <h3>Actors</h3>

                {stars.map( (star, i) => (
                    <div key={i} className="movie-star">
                    {star}
                    </div>
                ))}
                <AvGroup >
                    <AvInput required value={newStar} onKeyPress={this.addStar} bsSize="" type="text" name="newStar" id="star" placeholder="Movie star" />
                    <FormText color="muted">
                    To add a new actor to the list hit "Enter"
                    </FormText>
                </AvGroup>
                <Button className="save-button" onClick={this.saveMovie}>
                    Add Movie
                </Button>
            {/* </div> */}
            </AvForm>
        );
    }
}

export default AddMovie;