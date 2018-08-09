import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'
import MovieCreate from './Movies/MovieCreate';


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
    savedList.push(movie);
    this.setState({savedList});
  }

  render(){
    return (
      <div>
        <button><Link to ='/movie/add'>Add Movie To List</Link></button>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route path="/movies/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
        <Route exact path ='/movie/add' component={MovieCreate}/>
      </div>
    )
  }
}
