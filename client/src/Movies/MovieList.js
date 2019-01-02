import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios('http://localhost:5000/api/movies')
      .then(res => this.setState({ movies: res.data }) )
      .catch(err => { throw new Error(err) });
  }

  render() {
    return (
      <div className="movie-list">
          <Link to="/add-movie" className="far fa-plus-square add-movie-icon"></Link>
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
