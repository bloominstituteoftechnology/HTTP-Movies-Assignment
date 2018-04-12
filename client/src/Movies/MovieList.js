import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/api/movies')
      .then(response => {
        this.setState({ movies: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (!this.state.movies) return <div>Loading Movies....</div>
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
