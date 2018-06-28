import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'
import MovieCreate from './Movies/MovieCreate';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      savedList: [],
      movies: []
    }
  }

  componentDidMount() {
    // fill me in with an HTTP Request to `localhost:5000/api/movies`
    axios
      .get('http://localhost:5000/api/movies')
      .then(response => this.setState({ movies: response.data }))
      .catch(err => console.log(err));
  }

  addToSavedList = (movie) => {
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({ savedList });
  }

  handleSetData = data => {
    this.setState({ movies: data });
  }

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" render={props => <MovieList {...props} movies={this.state.movies} />} />
        <Route path="/movies/:id" render={(props) => {
          return (<Movie {...props} addToSavedList={this.addToSavedList} handleSetData={this.handleSetData} />)
        }} />
        <Route path='/movie/add' component={MovieCreate} />
      </div>
    )
  }
}
