import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import Form from "./Movies/Form";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: [],
      title: '',
      director: '',
      metascore: undefined,
      'stars[0]': '',
      'stars[1]': '',
      'stars[2]': '',
      movies: []
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  addMovie = () => {
    axios.post("http://localhost:5000/api/movies", {
      title: this.state.title,
      director: this.state.director,
      metascore: this.state.metascore,
      stars: [this.state['stars[0]'], this.state['stars[1]'], this.state['stars[2]']]
    })
    .then(res => this.setState({ movies: res.data, title: '', director: '', metascore: undefined, 'stars[0]': '', 'stars[1]': '', 'stars[2]': '' }))
    .catch(err => console.log(err));
    window.location.reload();
  }

  addToSavedList = movie => {
    console.log(this.state.savedList);
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({ savedList });
  };

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" render={props => <MovieList {...props} movies={this.state.movies}/>} />
        <Route
          path="/movies/:id"
          render={props => {
            return <Movie {...props} addToSavedList={this.addToSavedList} />;
          }}
        />
        <Route path="/movies/add" render={props => <Form {...props} title={this.state.title} director={this.state.director} metascore={this.state.metascore} star0={this.state['stars[0]']} star1={this.state['stars[1]']} star2={this.state['stars[2]']} handleInputChange={this.handleInputChange} addMovie={this.addMovie} />} />
      </div>
    );
  }
}
