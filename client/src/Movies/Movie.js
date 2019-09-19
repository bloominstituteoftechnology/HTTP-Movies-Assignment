import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import MovieCard from "./MovieCard";

export default class Movie extends React.Component {

  saveMovie = props => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.props.movie);
  };

  deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.props.movie.id}`)
        .then(res => {
          console.log(res);
          this.props.removeMovie(this.props.movie.id);
          this.props.history.push('/');
        })
        .catch(err => console.log(err.response))
  };

  render() {

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.props.movie} />
        <div className="save-button button" onClick={this.saveMovie}>
          Save
        </div>
        <div onClick={this.deleteMovie} className="delete-button button">
          Delete
        </div>
        <div className="edit-button button">
          <Link to={`/update-movie/${this.props.movie.id}`}>
          Edit
          </Link>
        </div>
      </div>
    );
  }
}
