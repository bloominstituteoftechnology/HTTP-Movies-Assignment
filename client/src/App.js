import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import MovieCreate from './Movies/MovieCreate';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedList: [],
    };
  }

  addToSavedList = movie => {
    console.log(this.state.savedList);
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({ savedList });
  };

  updateMovies = movie => {
    axios
      .post('http://localhost:5000/api/movies', movie)
      .then(response => console.log(response.data))
      .catch(err => console.log('ERROR adding a movie:', err));
  };

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route
          exact
          path="/movies/:id"
          render={props => {
            return <Movie {...props} addToSavedList={this.addToSavedList} />;
          }}
        />
        <Route
          exact
          path="/movie/add"
          render={props => {
            return <MovieCreate {...props} updateMovies={this.updateMovies} />;
          }}
        />
      </div>
    );
  }
}
