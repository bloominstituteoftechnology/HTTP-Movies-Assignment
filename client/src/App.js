import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import AddMovieForm from './Movies/AddMovieForm';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: [],
    }
  }



  addToSavedList = (movie) => {
    console.log(this.state.savedList)
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({savedList});
  }

    addMovie = (title, director, metascore, stars) => {
      let newMovie = {
        title: title,
        director: director,
        metascore: metascore,
        stars: stars,
      };
      axios
        .post('http://localhost:5000/api/movies', newMovie)
        // .then(response => {
        //   this.setState(() => ({
        //     movies: response.data }));
        // })
        .then(window.location.reload())
        .catch(error => {
          console.error('Sorry ', error);
        })
    }


  render(){
    return (
      <div className='app'>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route path="/movies/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
        <Route path='/movies/add' render={(props) => (<AddMovieForm {...props} addMovie={this.addMovie} /> )}/>
      </div>
    )
  }
}
