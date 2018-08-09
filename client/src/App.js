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
      savedList: [],
      movies: []
    }
  }
  componentDidMount () {
    console.log(this.state.savedList); 
    axios.get('http://localhost:5000/api/movies')
      .then(response => {
        this.setState({movies: response.data})
      })
      .catch(error =>  console.log(error));
  }

  addToSavedList = (movie) => {
    console.log(this.state.savedList)
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({savedList});
  }

  addMovieToList = (movie) => {
    console.log(movie); 
    axios.post('http://localhost:5000/api/movies', movie)
      .then(response => {
        console.log(response)
        this.setState({movies:response.data})
      })
      .catch(error => console.log(error))
  }

  render(){
    return (
      <div>
        <div className = "save-button"><Link to ='/movie/add'>Add Movie To List</Link></div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" render={ (props) => <MovieList {...props} movies={this.state.movies} />} />
        <Route path="/movies/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
        <Route exact path ='/movie/add' render={(props) => <MovieCreate {...props} addMovie = {this.addMovieToList}/>}/>
      </div>
    )
  }
}
