import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

class MovieCreate extends React.Component {
    constructor() {
        super();

        this.state = {
            title: '',
            director: '',
            actor: '',
            metascore: 0,
            stars: [],
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleAddMovie = () => {
        const { title, director, metascore, stars } = this.state;
        const movie = { title, director, metascore, stars }

        axios
            .post('http://localhost:5000/api/movies', movie)
            .then(this.setState({ title: '', director: '', metascore: 0, stars: [] }))
            .catch(err => console.log(err));
    }

    handleAddStars = () => {
        const stars = this.state.stars.slice();
        stars.push(this.state.actor);
        this.setState({ stars, actor: '' });
    };


    render() {
        return (
            <div className='save-wrapper'>
                <MovieCard title={this.state.title} director={this.state.director} metascore={this.state.metascore} stars={this.state.stars} />

                <form onSubmit={event => event.preventDefault()}>
                    <input value={this.state.title} onChange={this.handleInput} type='text' placeholder='title' name='title' />
                    <input value={this.state.director} onChange={this.handleInput} type='text' placeholder='director' name='director' />
                    <input value={this.state.metascore} onChange={this.handleInput} type='text' placeholder='metascore' name='metascore' />
                    <input value={this.state.actor} onChange={this.handleInput} type='text' placeholder='actor' name='actor' />

                    <button onClick={this.handleAddMovie}>Submit</button>
                    <button onClick={this.handleAddStars}>Add Actor</button>
                </form>
            </div>
        );
    }
}

export default MovieCreate;