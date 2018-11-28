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
    console.log(this.state.savedList);
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({ savedList });
  };
  reveal = () => {
    this.setState({ reveal: !this.state.reveal });
  };

  render() {
    console.log(this.state.reveal);
    const button = !this.state.reveal && (
      <div className="button" onClick={this.reveal}>
        Add Movie
      </div>
    );
    console.log(button);
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
        {button}
      </div>
    );
  }
}
