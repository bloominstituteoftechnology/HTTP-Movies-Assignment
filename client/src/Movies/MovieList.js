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
    console.log('mounted')
    axios.get(URL)
      .then(response => {
      this.setState({
        movies: response.data,
        loading: false,
      }, () => this.movieCheck());
      })
      .catch(response => {
        console.log(`error ${response}`);
      });

    
  }

  movieCheck = () => {
    if (this.props.newMovie) {
      console.log(this.state.movies)
      if (
        !this.state.movies.some(
          movie => movie.title === this.props.newMovie.title
        )
      ) {
        console.log('there isnt one')
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
