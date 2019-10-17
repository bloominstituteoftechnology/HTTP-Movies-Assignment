import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

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

  onClickToDeleteMovie = id => {
    const deleteMovie = this.props.deleteMovie;
    deleteMovie(id);
  };

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
        <button>
          <Link to={`/update-movie/${this.state.movie.id}`}>Update</Link>
        </button>
        <button onClick={e => this.onClickToDeleteMovie(this.state.movie.id)}>
          Delete
        </button>
      </div>
    );
  }
}
