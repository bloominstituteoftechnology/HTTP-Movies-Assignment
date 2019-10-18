import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './MovieCard';
import UpdateMovieForm from './UpdateMovieForm';
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
    console.log('Movie.js cdm props: ', this.props);
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
        console.log('Movie.js DELETE res: ', res);
        this.props.history.push('/movies');
      })
      .catch(err => console.log('Movie.js DELETE err: ', err));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className='save-wrapper'>
        <MovieCard movie={this.state.movie} />
        <div className='save-update-btns'>
          <button className='save-button' onClick={this.saveMovie}>
            Save
          </button>
          <button
            onClick={() =>
              this.props.history.push(`/update-movie/${this.state.movie.id}`)
            }
            className='save-button'
          >
            Edit Movie
          </button>
          <button
            onClick={() => this.deleteMovie(this.props.match.params.id)}
            className='save-button'
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
