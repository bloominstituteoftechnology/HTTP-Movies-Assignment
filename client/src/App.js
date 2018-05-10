import React, { Component } from 'react';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

import { Route, Link } from 'react-router-dom';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: []
    }; 
  }

  addToSavedList = movie => {
    console.log("addToSavedList invoked");
    const savedList = this.state.savedList;
    if( this.state.savedList.filter( savedMovie => savedMovie.title === movie.title ).length === 0 ) {
      console.log(this.state.savedList.filter( savedMovie => savedMovie.title === movie.title ))
      savedList.push(movie);
      this.setState({ savedList });
      console.log(this.state.savedList.filter( savedMovie => savedMovie.title === movie.title ))
    }
  };

  render() {
    const addToSavedList = this.addToSavedList;
    return (
      <div>
        <SavedList list={this.state.savedList} />

        {/* <div>Replace this Div with your Routes</div> */}
        <Route exact path="/" component={MovieList} />
        
        {/* <Route path="/movies/:id" component={Movie} /> */}
        {/* <Route path="/movies/:id" render={(props) => <Movie routeProp={props} save={this.addToSavedList} /> } /> */}
        <Route path="/movies/:id" render={ props => (
          <Movie {...props} addToSavedList={addToSavedList}  />
        ) } />
        
      </div>
    );
  }
}
