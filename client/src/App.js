import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import MovieForm from './Movies/MovieForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedList: [],
      movies: []
    };
  }

  addToSaved = movie => {
    const { savedList } = this.state;
    if (!savedList.find(({ id }) => id === movie.id)) {
      this.setState({ savedList: [ ...savedList, movie ] })
    }
  };

  removeFromSaved = movie => {
    const savedList = this.state.savedList.filter(({ id }) => id !== movie.id);
    this.setState({ savedList });
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  addMovie = e => {
    const { title, director, metascore, stars, src } = this.state;
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/movies', {
        title,
        director,
        metascore,
        stars: stars.split(', '),
        src
      })
      .then(({ data }) => {
        this.setState({ movies: data }, () => this.props.history.push('/'));
      })
      .catch(err => {
        console.error('Server Post', err);
      });
  };

  /* Lifecycle methods */

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/movies')
      .then(({ data }) => {
        this.setState(() => ({ movies: data }));
      })
      .catch(err => {
        console.error('Server Error', err);
      });
  }

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route
          exact
          path="/"
          render={props => <MovieList {...props} movies={this.state.movies} />}
        />
        <Route
          path="/add"
          render={props => (
            <MovieForm
              {...props}
              onChange={this.handleInputChange}
              addMovie={this.addMovie}
            />
          )}
        />
        <Route
          path="/movies/:id"
          render={props => (
            <Movie
              {...props}
              addToSaved={this.addToSaved}
              removeFromSaved={this.removeFromSaved}
              savedList={this.state.savedList}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
