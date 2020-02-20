import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Route } from "react-router-dom";

import UpdateForm from './UpdateForm';

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
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} addToSavedList={this.props.addToSavedList}/>
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <>
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
    {/* <Route path='/update-movie/:id'
    render={props => {
      return <UpdateForm {...props} addToSavedList={props.addToSavedList} movie={movie} />
    }}
    /> */}
    </>
  );
}
