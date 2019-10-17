import React from "react";
import axios from "axios";
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

  componentWillReceiveProps(newProps) {
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

  deleteMovie = () => {
    this.props.deleteMovie(this.state.movie.id);
    this.props.history.push('/');
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <>
        <MovieCard movie={this.state.movie} />
        <div className="save-wrapper">
          <button className="movie-btn save-button" onClick={this.saveMovie}>
            Save
          </button>
          <button className="movie-btn edit-button" onClick={() => this.props.history.push(`/update-movie/${this.state.movie.id}`)}>Edit</button>
          <button className="movie-btn delete-button" onClick={this.deleteMovie}>Delete</button>
        </div>
      </>
    );
  }
}