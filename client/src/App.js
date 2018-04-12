import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import SavedList from './Movies/SavedList'
import MovieList from './Movies/MovieList'
import MovieForm from './Movies/MovieForm'
import Movie from './Movies/Movie'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: []
    }
  }

  addToSavedList = (movie) => {
    const savedList = this.state.savedList
    if (!savedList.includes(movie)) {
      savedList.push(movie)
      this.setState({savedList})
    }  
  }

  createMovie = (movie) => {
    axios.post('http://localhost:3333/api/movies', movie)
      .then((response) => console.log(response))
      .catch((error) => console.log(`Error creating movie: ${error}`))
  }

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route path="/add" render={(props) => (
          <MovieForm createMovie={this.createMovie} {...props} />
        )} />
        <Route exact path="/" component={MovieList} />
        <Route path="/movies/:id" render={(props) => (
          <Movie addToSavedList={this.addToSavedList} {...props} />
        )} />
      </div>
    )
  }
}
