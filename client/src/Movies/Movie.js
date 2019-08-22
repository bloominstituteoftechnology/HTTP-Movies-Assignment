import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentDidUpdate(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = (movie) => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => this.props.history.push('/'))
      .catch(err => console.log(err.response));
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <Link to={{
          pathname:`/update-movie/${this.state.movie.id}`,
          state: this.state.movie
        }}>Update</Link>
        <button onClick={() => this.deleteMovie(this.state.movie)}>Delete</button>
      </div>
    );
  }
}
