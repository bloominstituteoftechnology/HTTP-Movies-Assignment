import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

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
      .then(response => {
        this.setState({ movie: response.data });
      })
      .catch(error => {
        console.error("Server error: ", error);
      });
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
      .then(response => {
        console.log(response.data);
        this.setState({ movie: null });
        this.props.handleSetData(response.data, Number(this.props.match.params.id));
      })
      .catch(err => {
        console.log(err);
      });
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
        <button className="delete-button" onClick={this.handleDelete}>
          Delete
        </button>
      </div>
    );
  }
}
