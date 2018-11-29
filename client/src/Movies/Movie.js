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

  componentWillReceiveProps({ match: { params } }) {
    if (this.props.match.params.id !== params.id) {
      this.fetchMovie(params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(({ data }) => {
        this.setState({ movie: data });
      })
      .catch(console.error);
  };

  saveMovie = () => {
    this.props.addToSaved(this.state.movie);
  };

  removeMovie = () => {
    this.props.removeFromSaved(this.state.movie);
  };

  render() {
    const { movie } = this.state;
    if (!movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={movie} />
        {this.props.savedList.find(({ id }) => id === movie.id) ? (
          <div className="unsave-button" onClick={this.removeMovie}>
            Unsave
          </div>
        ) : (
          <div className="save-button" onClick={this.saveMovie}>
            Save
          </div>
        )}
      </div>
    );
  }
}
