import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { Label, Input } from 'reactstrap';

class MovieCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: null,
            stayInPage: false,
            title: '',
            director: '',
            actor: '',
            metascore: '',
            stars: [],
        }
    }

    componentDidMount() {
        if (this.props.movie) {
            this.getMovieInfo(this.props.movie);
        }
    }

    getMovieInfo = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(response => this.setState({
                movie: response.data,
                title: response.data.title,
                director: response.data.director,
                metascore: response.data.metascore,
                stars: response.data.stars
            }))
            .catch(err => console.log(err));
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
                this.state.stayInPage ? null : this.props.history.push('/');
            })
            .catch(err => console.log(err));
    }

    handleEditMovie = () => {
        const { title, director, stars } = this.state;
        const metascore = Number(this.state.metascore);
        const movie = { title, director, metascore, stars }

        if (title === '' || director === '' || metascore === '' || stars.length === 0) {
            alert('You forgot to input a value!');
            return;
        }

        axios
            .put(`http://localhost:5000/api/movies/${this.props.movie}`, movie)
            .then(response => {
                this.props.handleSetData(response.data);
                this.state.stayInPage ? null : this.props.history.push('/');
            })
            .catch(err => console.log(err));
    }

    handleAddStars = () => {
        const stars = this.state.stars.slice();
        stars.push(this.state.actor);
        this.setState({ stars, actor: '' });
    };

    deleteActor = index => {
        const stars = this.state.stars.slice();
        stars.splice(index, 1);
        this.setState({ stars })
    }

    render() {
        return (
            <div className='save-wrapper'>

                <MovieCard deleteActor={this.deleteActor} title={this.state.title} director={this.state.director} metascore={this.state.metascore} stars={this.state.stars} />

                <form className='add-form' onSubmit={event => event.preventDefault()}>

                    <input className='input-field' value={this.state.title} onChange={this.handleInput} type='text' placeholder='Title' name='title' />
                    <input className='input-field' value={this.state.director} onChange={this.handleInput} type='text' placeholder='Director' name='director' />
                    <input className='input-field' value={this.state.metascore} onChange={this.handleInput} type='text' placeholder='Metascore' name='metascore' />
                    <input className='input-field' value={this.state.actor} onChange={this.handleInput} type='text' placeholder='Actor' name='actor' />

                    <button className='add-buttons' onClick={this.handleAddStars}>Add actor</button>
                    <button className='add-buttons' onClick={this.state.movie ? this.handleEditMovie : this.handleAddMovie}>{this.state.movie ? 'Save' : 'Submit'}</button>

                </form>

                <div className='checkbox'>
                    <Label check>
                        <Input type="checkbox" onChange={() => this.setState({ stayInPage: !this.state.stayInPage })} />
                        Stay in page?
                    </Label>
                </div>

            </div>
        );
    }
}

export default MovieCreate;