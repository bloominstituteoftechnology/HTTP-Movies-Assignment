import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import { EventEmitter } from '../event';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    EventEmitter.subscribe('addMovie', (newMovie) => this.addMovie(newMovie))
  }

  componentDidMount() {
    axios
    .get('http://localhost:5000/api/movies')
    .then(response => {
      this.setState({ movies: [...response.data] });
    })
    .catch(error => {
      console.error('Error', error)
    })
  }
  
  addMovie = (newMovie) => {
    axios
      .post('http://localhost:5000/api/movies', newMovie) 
      .then(response => {
          this.setState({ movies: response.data });
          alert('Movie added! Click the home link above to see the full movie list');
      })
      .catch(error => {
          alert('Error: we\'re sorry, your movie could not added', error);
      });
  }

  render() {
    return (
      <div className="movie-list">
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
