import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'
import AddMovie from './Movies/AddMovie';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: [],
      title: "",
      director: "",
      metascore: "",
      stars: ""
    }
  }

  handleAddMovie = () => {
    const newMovie = { 
      title: this.state.title, 
      director: this.state.director,
      metascore: this.state.metascore,
      stars: this.state.stars.split(", ") 
    };

    axios.post("http://localhost:5000/api/movies", newMovie).then(response => {
      this.setState({ savedList: response.data, title: "", director: "", metascore: "", stars: "" });
    }).catch(error => console.log(error));
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
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route path="/movies/add" render={ (props) => { 
          return(<AddMovie 
            {...props} 
            title={this.state.title}
            director={this.state.director}
            metascore={this.state.metascore}
            stars={this.state.stars}
            handleChange={this.handleChange}
            handleMovieSubmit={this.handleAddMovie} />)
          }} />
        <Route path="/movies/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
      </div>
    )
  }
}
