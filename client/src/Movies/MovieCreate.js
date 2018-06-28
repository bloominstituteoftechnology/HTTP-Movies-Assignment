import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
const URL = `http://localhost:5000/api/movies`;

class MovieCreate extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            director: '',
            metascore: '',
            stars: [],
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const movie = ({ title: this.state.title, director: this.state.director, metascore: this.state.director, stars: ['a','b','c'] });
        axios
            .post(URL, movie)
            .then(this.setState({title: '', director: '', metascore: '', stars: ''}))
           .catch(err => {
               console.log(err);
           })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={this.handleChange}
                    value={this.state.title}
                />
                <input
                    type="text"
                    placeholder="Director"
                    name="director"
                    onChange={this.handleChange}
                    value={this.state.director}
                />
                <input
                    type="number"
                    placeholder="Metascore"
                    name="metascore"
                    onChange={this.handleChange}
                    value={this.state.metascore}
                />
                <button>Submit</button>
            </form>
        );
    }
}

export default MovieCreate;