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
            starAmount: ''
        };
    }
    addStars = (num) => {
        let person = [];
        for(let i = 0; i < num; ++i){
            person[i] = prompt(`Please enter Actor#${i + 1}`)
        }
        return person;
    }

    handleSubmit = e => {
        e.preventDefault();
        this.state.stars =  this.addStars(this.state.starAmount);
        const movie = ({ title: this.state.title, director: this.state.director, metascore: this.state.metascore, stars: this.state.stars });
        axios
            .post(URL, movie)
            .then(this.setState({title: '', director: '', metascore: '', stars: '',starAmount: ''}))
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
                <input
                type="number"
                placeholder="How many actors"
                name='starAmount'
                onChange={this.handleChange}
                value={this.state.starAmount}
                />
                <button>Submit</button>
            </form>
        );
    }
}

export default MovieCreate;