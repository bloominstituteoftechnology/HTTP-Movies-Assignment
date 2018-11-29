import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'
import AddForm from './Movies/AddForm';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: [],
      movies: []
    }
  }

  componentDidMount() {

    axios.get('http://localhost:5000/api/movies')
      .then(response => this.setState({movies: response.data}))
      .catch(err => console.log(err));

  }

  addToSavedList = (movie) => {
    console.log(this.state.savedList)
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({savedList});
  }

  addMovie = movie => {

    axios.post('http://localhost:5000/api/movies', movie)
      .then(response => this.setState({movies: response.data}))
      .catch(err => console.log(err));

  }

  render(){
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/movie/add" render={props => <AddForm {...props} addFunc={this.addMovie} />} />
        <Route exact path="/" render={props => <MovieList {...props} movies={this.state.movies} />} />
        <Route path="/movies/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
      </div>
    )
  }
}
