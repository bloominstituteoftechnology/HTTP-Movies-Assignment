import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import MovieForm from './Movies/MovieForm';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: [],
      title: '',
      director: '',
      metascore: null,
      stars: '',
    }
  }

  addToSavedList = (movie) => {
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({savedList});
  }

  changeHandler = event => {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value});
  }

  submitHandler = event => {
    event.preventDefault();
    if (this.state.title !== '' && this.state.director !== '' && this.state.metascore !== null && this.state.stars !== '') {
      let obj = {
        title: this.state.title,
        director: this.state.director,
        metascore: this.state.metascore,
        stars: this.state.stars.split(','),
      }
      axios.post('http://localhost:5000/api/movies', obj)
           .then(res => {
            console.log(res.data)
           })
           .catch(err => console.log(err))
      this.setState({
        title: '',
        director: '',
        metascore: null,
        stars: '',
      })
      document.querySelector('form').reset();
    }
    else {
      alert('Please enter data for your movie.')
    }
  }

  render(){
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" render={props => <MovieList {...props} addedMovie={this.state.addedMovie}/>} />
        <Route path="/movies/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
        <Route path="/add" render={props => <MovieForm {...props} changeHandler={this.changeHandler} submitHandler={this.submitHandler}/>} />
      </div>
    )
  }
}
