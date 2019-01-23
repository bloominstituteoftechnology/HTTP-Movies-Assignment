import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import AddMovie from './Movies/AddMovie';
import Movie from './Movies/Movie'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: []
    }
  }

  addToSavedList = (movie) => {
    if (!this.state.savedList.some(x => x.title === movie.title)){ // .includes(movie) will not work because they will be two separate objects.
      this.setState((prevState) => {
        return {
          savedList: [...prevState.savedList, movie]
        }
      });
    }
  }

  render(){
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route path="/movies/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
        <Route path="/add-movie" component={AddMovie} />
      </div>
    )
  }
}
