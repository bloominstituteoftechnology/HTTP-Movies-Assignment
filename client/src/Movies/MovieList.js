import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    console.log("Mounted");
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        console.log(res);
        this.setState({ movies: res.data });
      })
      .catch(err => console.log(err.response));
  }

  render() {
    console.log("render Movie List");
    return (
      <div className='movie-list'>
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

//export default MovieList;