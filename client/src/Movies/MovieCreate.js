import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

class MovieCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            director: '',
            actor: '',
            metascore: '',
            stars: [],
        }
    }

    handleInput = event => {
        if (event.target.name === 'metascore') {
            if (isNaN(event.target.value) || event.target.value.includes('.')) {
                return;
            }
        }
        this.setState({ [event.target.name]: event.target.value });
    }

    handleAddMovie = () => {
        const { title, director, stars } = this.state;
        const metascore = Number(this.state.metascore);
        const movie = { title, director, metascore, stars }

        if (title === '' || director === '' || metascore === '' || stars.length === 0) {
            alert('You forgot to input a value!');
            return;
        }

        axios
            .post('http://localhost:5000/api/movies', movie)
            .then(response => {
                this.setState({ title: '', director: '', metascore: '', stars: [] })
                this.props.handleSetData(response.data);
            })
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

                <form className='add-form' onSubmit={event => event.preventDefault()}>

                    <input className='input-field' value={this.state.title} onChange={this.handleInput} type='text' placeholder='Title' name='title' />
                    <input className='input-field' value={this.state.director} onChange={this.handleInput} type='text' placeholder='Director' name='director' />
                    <input className='input-field' value={this.state.metascore} onChange={this.handleInput} type='text' placeholder='Metascore' name='metascore' />
                    <input className='input-field' value={this.state.actor} onChange={this.handleInput} type='text' placeholder='Actor' name='actor' />
                    
                    <button className='add-buttons' onClick={this.handleAddStars}>Add actor</button>
                    <button className='add-buttons' onClick={this.handleAddMovie}>Submit</button>

                </form>

            </div>
        );
    }
}

export default MovieCreate;