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
    axios.get(`http://localhost:5000/api/movies`)
      .then(response => response.data)
      .then(data => this.setState({ movies: data }))
      .catch(e => console.error(e))
  }

  render() {
    return (
      <div className="movie-list">
        { this.state.movies.length === 0
            ? <div>Loading</div>
            : this.state.movies.map(movie => (
                <MovieDetails key={movie.id} movie={movie} />
              ))
        }
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
