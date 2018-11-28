import React, { Component } from "react";
import { Route } from "react-router-dom";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieCreate from "./Movies/MovieCreate";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: [],
      reveal: false
    };
  }

  addToSavedList = movie => {
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({ savedList });
  };
  reveal = () => {
    this.setState({ reveal: !this.state.reveal });
  };

  render() {
    const button = !this.state.reveal && (
      <div className="button" onClick={this.reveal}>
        Add Movie
      </div>
    );

    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route
          path="/movies/:id"
          render={props => {
            return <Movie {...props} addToSavedList={this.addToSavedList} />;
          }}
        />
        <Route
          path="movies/add"
          render={props => <MovieCreate {...props} submit={this.submit} />}
        />
        {button}
      </div>
    );
  }
}
