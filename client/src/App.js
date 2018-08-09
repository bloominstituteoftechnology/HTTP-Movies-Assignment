import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from "./Movies/MovieForm";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedList: [],
      movies: []
    };
  }

  addToSavedList = movie => {
    const savedList = this.state.savedList;
    if (savedList.filter(saved => saved.id === movie.id).length === 0) {
      savedList.push(movie);
      this.setState({ savedList });
    }
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addMovie = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", {
        title: this.state.title,
        director: this.state.director,
        metascore: this.state.metascore,
        stars: this.state.stars.slice().split(', '),
        src: this.state.src
      })
      .then(res => {
        this.setState({
          movies: res.data
        }, () => window.location="/");
      })
      .catch(err => {
        console.error("Server Post", err);
      });
  };

  /* Lifecycle methods */

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        this.setState(() => ({ movies: res.data }));
      })
      .catch(error => {
        console.error("Server Error", error);
      });
  }

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" render={props => (
          <MovieList 
            {...props}
            movies={this.state.movies}
          />
        )} />
        <Route
          path="/add"
          render={props => (
            <MovieForm
              {...props}
              onChange={this.handleInputChange}
              addMovie={this.addMovie}
            />
          )}
        />
        <Route
          path="/movies/:id"
          render={props => (
            <Movie
              {...props}
              addToSavedList={this.addToSavedList}
              savedList={this.state.savedList}
            />
          )}
        />
      </div>
    );
  }
}
