import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'
import AddMovieForm from './Movies/AddMovieForm';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: [],
      title: "",
      director: "",
      metascore: "",
      stars: [],
  
    }
  }

  addToSavedList = (movie) => {
    console.log(this.state.savedList)
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({savedList});
  }
  change = event => {
    this.setState({[event.target.name]: event.target.value})
    console.log("title is: ", this.state.title)
    console.log("director is: ", this.state.directors)
  }

  changeStars = event => {
    let arrayEvent = event.target.value.split(", ");
    this.setState({[event.target.name]: arrayEvent})
    console.log("title is: ", this.state.title)
    console.log("director is: ", this.state.directors)
  }
  
  addmovie = () => {
    const movie = { title: this.state.title, director: this.state.director, metascore: this.state.metascore, stars: this.state.stars }
    axios.post("http://localhost:5000/api/movies", movie)
    .then(response => {
      this.setState({ savedList: response.data })
    })
    .catch(error => console.log(error));
  }

  render(){
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Link to="/movies/addMovieForm"><button>Add New Movie</button></Link>    
        <Route exact path="/movies/addMovieForm" render={props => <AddMovieForm {...props} changeStars={this.changeStars} change={this.change} addmovie={this.addmovie} />} /> 
        <Route exact path="/" component={MovieList} />
        <Route path="/movies/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
      </div>
    )
  }
}
