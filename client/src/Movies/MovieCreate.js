import React, { Component } from 'react';
import axios from 'axios';

class MovieCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { title:'', director: '', metascore: 0, stars: '' }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let starsList = this.state.stars.split(', ');
        let url = `http://localhost:5000/api/movies`;
        axios.post(url, {
            title: this.state.title,
            director: this.state.director,
            metascore: this.state.metascore,
            stars: starsList
        })
            .then(res => {
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() { 
        return ( 
            <div className="movie-form">
                <h2>Add a movie!</h2>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text" name="title" value={this.state.title} placeholder="Title" required></input>
                    <input onChange={this.handleChange} type="text" name="director" value={this.state.director} placeholder="Director" required></input>
                    <input onChange={this.handleChange} type="number" name="metascore" value={this.state.metascore} placeholder="Metascore" required></input>
                    <input onChange={this.handleChange} type="text" name="stars" value={this.state.stars} placeholder="Stars" required></input>
                    <button> Add </button>
                </form>
            </div>
        );
    }
}
 
export default MovieCreate;