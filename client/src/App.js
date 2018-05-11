import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import AddMovie from './Movies/AddMovie';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      savedList: []
    }
  }

  addToSavedList = (movie) => {
    console.log(this.state.savedList);
    const savedList = this.state.savedList;
    for (let i = 0; i < savedList.length; i++) {
      if (movie.id === savedList[i].id) {
        return;
      }
    }
    savedList.push(movie);
    this.setState({ savedList });
  }

  render() {
    console.log('Saved List', this.state.savedList);
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route exact path="/addmovie" component={AddMovie} />
        <Route path="/movies/:id" render={(props) => {
          return (<Movie {...props} addToSavedList={this.addToSavedList} />)
        }} />
      </div>
    )
  }
}
