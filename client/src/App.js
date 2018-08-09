import React, { Component } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import CreateMovie from "./Movies/CreateMovie";

export default class App extends Component {
  state = {
    savedList: [],
    add: false,
    newMovie: "",
  };

  addToSavedList = movie => {
    this.setState(prevState => ({
      savedList: [...prevState.savedList, movie],
    }));
  };

  handleToggle = () => {
    this.setState(prevState => ({
      add: !prevState.add,
    }));
  };

  handleNewMovie = movie => {
    this.setState({ 
      newMovie: movie,
      add: false
     })
  };

  render() {
    return (
      <div>
        <Route
          path="/"
          render={props => {
            return (
              <SavedList
                {...props}
                list={this.state.savedList}
                add={this.state.add}
                handleToggle={this.handleToggle}
              />
            );
          }}
        />
        <Route
          exact path="/add"
          render={props => {
            return <CreateMovie {...props} addMovie={this.handleNewMovie} />;
          }}
        />
        <Route
          exact path="/"
          render={props => {
            return (
              <MovieList
                {...props}
                clearMovie={this.handleNewMovie}
                newMovie={this.state.newMovie}
              />
            );
          }}
        />
        <Route
          path="/movies/:id"
          render={props => {
            return (
              <Movie
                {...props}
                addToSavedList={this.addToSavedList}
              />
            );
          }}
        />
      </div>
    );
  }
}
