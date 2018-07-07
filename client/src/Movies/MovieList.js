import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(response => {
        this.setState({ movies: response.data });
      })
      .catch(error => {
        console.error("Server error: ", error);
      });
  }

  render() {
    const movies = this.state.movies.slice().reverse();
    return (
      <div className="movie-list">
        <h3>Movie List:</h3>
        {movies.map(movie => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-list-link">
            {movie.title}
          </Link>
        ))}
      </div>
    );
  }
}
