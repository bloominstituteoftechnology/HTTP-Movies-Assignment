import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   axios
  //     .get("http://localhost:5000/api/movies")
  //     .then(res => {
  //       this.props.setMovieList(res.data)
  //       // this.setState({ movies: res.data })
  //     })
  //     .catch(err => console.log(err.response));
  // }

  render() {

    const movies = this.props.movies;
    return (
      <div className="movie-list">
        {this.props.listMovies.map(movie => (
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
