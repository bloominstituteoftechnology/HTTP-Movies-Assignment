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

  addToSavedList = movie => {
    const savedList = this.state.savedList;
    for (let i = 0; i < savedList.length; i++) {
      if (savedList[i].id === movie.id) {
        return;
      }
    }

    savedList.push(movie);

    this.setState({ savedList });
  }

  handleSetData = (data, id) => {
    const savedList = this.state.savedList
      .filter(saved => saved.id !== id);

    this.setState({ movies: data, savedList });
  }

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" render={props => <MovieList {...props} movies={this.state.movies} />} />
        <Route path="/movies/:id" render={(props) => {
          return (<Movie {...props} addToSavedList={this.addToSavedList} handleSetData={this.handleSetData} />)
        }} />
        <Route path='/movie/add' render={props => <MovieCreate {...props} handleSetData={this.handleSetData} />} />
        <Route path='/:id/edit' render={props => <MovieCreate {...props} movie={props.match.params.id} handleSetData={this.handleSetData} />} />
      </div>
    )
  }
}
