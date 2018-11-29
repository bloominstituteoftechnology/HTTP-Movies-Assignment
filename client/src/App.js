import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieCreate from "./Movies/MovieCreate";

class App extends Component {
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
  addMovie = movie => {
    axios.post(`http://localhost:5000/api/movies`, movie);
    // .then(res => console.log(res))
    // .catch(err => console.error(err));
  };

  render() {
    console.log(this.props);
    const button = !this.state.reveal && (
      <div
        className="button"
        onClick={() => this.props.history.push("/movie/add")}
      >
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
          path="/movie/add"
          render={props => <MovieCreate {...props} addMovie={this.addMovie} />}
        />
        {button}
      </div>
    );
  }
}

export default withRouter(App);
