import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import MovieCard from './MovieCard';
import AddMovieForm from './AddMovieForm';
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => {
        console.log('MovieList.js cdm .get res: ', res);
        this.setState({ movies: res.data });
      })
      .catch(err => console.log(err.response));
  }

  /*  componentWillUpdate() {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => {
        console.log('MovieList.js cdm .get res: ', res);
        this.setState({ movies: res.data });
      })
      .catch(err => console.log(err.response));
  } */

  render() {
    return (
      <div className='movie-list'>
        <AddMovieForm setNewMovie={this.setState} />
        {console.log('MoviesList.js this.state.movies: ', this.state.movies)}
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
