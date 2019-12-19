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

  deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        this.props.history.push("/");
        this.setState(res.data);
      })
      .catch(error => console.log(error));
  };

  updateMovie = id => {
    this.props.history.push(`/update-movie/${this.props.match.params.id}`);
  };
  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <div className="movie-list">
          <MovieCard movie={this.state.movie} />
        </div>
        <div className="button-column">
          <div className="save-button" onClick={this.saveMovie}>
            Save
          </div>
          <div className="update-button" onClick={this.updateMovie}>
            Update
          </div>
          <div
            className="delete-button"
            onClick={() => this.deleteMovie(this.state.movie.id)}
          >
            Delete
          </div>
        </div>
      </div>
    );
  }
}
