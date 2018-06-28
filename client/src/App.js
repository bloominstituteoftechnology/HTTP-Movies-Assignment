import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import MovieCreate from './Movies/MovieCreate';
import axios from 'axios';

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

  handleMovieSubmit = () => {
    const newMovie = { title: this.state.title,
                       director: this.state.director,
                       metascore: this.state.metascore,
                       stars: this.state.stars.split(", ") };

    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then(response => {
        console.log("Submit: ", response);
        this.setState({ savedList: response.data,
                        title: "",
                        director: "",
                        metascore: "",
                        stars: "" });
      })
      .catch(error => console.log(error));
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  addToSavedList = (movie) => {
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({savedList});
  }

  render(){
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <div className="home-button">
          <Link to="/">Home</Link>
        </div>
        <div className="home-button">
          <Link to="/movies/add">Add</Link>
        </div>

        <Switch>
          <Route exact path="/" component={MovieList} />
          <Route path="/movies/add" render={ (props) => {
            return(<MovieCreate {...props} title={this.state.title}
                                           director={this.state.director}
                                           metascore={this.state.metascore}
                                           stars={this.state.stars}
                                           handleChange={this.handleChange}
                                           handleMovieSubmit={this.handleMovieSubmit} />)
          }} />
          <Route path="/movies/:id" render={ (props) => {
            return(<Movie {...props} addToSavedList={this.addToSavedList} />)
          }} />
        </Switch>
      </div>
    )
  }
}
