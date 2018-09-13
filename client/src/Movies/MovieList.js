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
    // fill me in with an HTTP Request to `localhost:5000/api/movies`
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => this.setState({
        movies: res.data
      }))
      .catch(err => console.log(err))
  }

  componentDidUpdate() {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => {
        // if number of movies in the database !== number of movies in the state, then
        // update the state
        if (res.data.length !== this.state.movies.length) {
          this.setState({
            movies: res.data
          })
        }
      })
      .catch(err => console.log(err))
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

function MovieDetails(props) {
  return (
    <Link to={`/movies/${props.movie.id}`}>
      <MovieCard movie={props.movie} />
    </Link>
  );
}
