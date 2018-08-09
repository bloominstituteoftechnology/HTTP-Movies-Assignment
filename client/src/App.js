import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import MovieCreate from './Movies/MovieCreate';
import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: [],
      movies: []
    };
  }

  async componentDidMount() {
    try {
      let response = await axios.get(`${API_URL}/movies`);

      this.setState({ movies: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  addMovie = async movie => {
    try {
      let response = await axios.post(`${API_URL}/movies`, movie);

      this.setState({ movies: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  addToSavedList = movie => {
    if (this.state.savedList.some(mv => movie.id === mv.id)) return;
    const savedList = this.state.savedList.slice();
    savedList.push(movie);
    this.setState({ savedList });
  };

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
          path="/movies/:id"
          render={props => {
            return <Movie {...props} addToSavedList={this.addToSavedList} />;
          }}
        />
        <Route
          exact
          path="/movie/add"
          render={() => <MovieCreate onSubmit={this.addMovie} />}
        />
      </div>
    );
  }
}
