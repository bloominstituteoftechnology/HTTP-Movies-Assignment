import React, { Component } from 'react';
import { get } from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

const URL = 'http://localhost:5000/api/movies'
const { log: l } = console

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    // fill me in with an HTTP Request to `localhost:5000/api/movies`
    get(URL)
      .then(({ data: movies }) => this.setState({movies}))
      .catch(e => l('uh oh', e))
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
