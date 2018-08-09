import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const URL = "http://localhost:5000/api/movies";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get(URL)
      .then(response => {
      this.setState({
        movies: response.data,
        loading: false,
      });
      })
      .catch(response => {
        console.log(`error ${response}`);
      });

    if (this.props.newMovie) {
      if (
        !this.state.movies.some(
          movie => movie.name === this.props.newMovie.name
        )
      ) {
        axios
        .post(URL, this.props.newMovie)
        .then(response => {
          this.setState({ movies: response.data });
          this.props.clearMovie("");
        })
        .catch(response => {
          console.log(`error ${response}`);
        });
      }
    }
  }

  render() {
    return (
      <Fragment>
        <div className="movie-list">
          {this.state.movies.map(movie => (
            <MovieDetails key={movie.id} movie={movie} />
          ))}
        </div>
      </Fragment>
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
