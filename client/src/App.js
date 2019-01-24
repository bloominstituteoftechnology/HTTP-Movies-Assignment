import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: []
    }
  }

  addToSavedList = (movie) => {
    const savedList = [...this.state.savedList];
    const duplicate = savedList.find(m => m.title === movie.title); // Check to be sure the movie is not in the list already
    if(!duplicate) savedList.push(movie);
    this.setState({savedList});
  }

  render(){
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Switch>  
          <Route path="/movies/add" component={MovieList} />
          <Route path="/movies/:id" render={ (props) => { 
            return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
          }} />
          <Route exact path="/" component={MovieList} />
        </Switch>
      </div>
    )
  }
}
