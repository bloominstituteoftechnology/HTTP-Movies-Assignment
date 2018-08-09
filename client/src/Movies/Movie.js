import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const URL = 'http://localhost:5000/api/movies'

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      added: false
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
    axios.get(`${URL}/${id}`).then(response => {
      this.setState({ movie: response.data })
    })
  };

  saveMovie = () => {
    this.props.addToSavedList(this.state.movie);
    this.setState({added: true})
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        {!this.state.added && <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>}
      </div>
    );
  }
}
