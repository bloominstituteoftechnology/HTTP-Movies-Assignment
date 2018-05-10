import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import AddMovie from './Movies/AddMovie';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: []
    }
  }

  addToSavedList = (movie) => {
    console.log(this.state.savedList)
    const savedList = this.state.savedList;
    if( this.state.savedList.filter( savedMovie => savedMovie.title === movie.title ).length === 0 ) {
      console.log(this.state.savedList.filter( savedMovie => savedMovie.title === movie.title ))
      savedList.push(movie);
      this.setState({ savedList });
      console.log(this.state.savedList.filter( savedMovie => savedMovie.title === movie.title ))
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
        <div className="container">
          <Route path="/add" component={AddMovie} />
        </div>
      </div>
    )
  }
}
