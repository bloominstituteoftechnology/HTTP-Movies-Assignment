import React from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import MovieForm from './Movies/MovieForm';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      savedList: [],
      title: "",
      director: "",
      metascore: "",
      stars: ""
    }
  }

  handleMovieSubmit = e => {
    e.preventDefault();

    const newMovie = { title: this.state.title,
                       director: this.state.director,
                       metascore: this.state.metascore,
                       stars: this.state.stars.split(", ") };

    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then(response => {
        console.log("Submit: ", response);
        this.setState({ title: "",
                        director: "",
                        metascore: "",
                        stars: "" });
        this.props.history.push('/');
      })
      .catch(error => console.log(error));
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSetData = (data, id) => {
    const savedList = this.state.savedList.filter(saved => saved.id !== id);
    console.log("Data: ", data);
    this.setState({ savedList });
    if (id) { this.props.history.push('/') }
  }

  addToSavedList = (movie) => {
    if (!this.state.savedList.find(savedMovie => savedMovie.id === movie.id)) {
      const savedList = this.state.savedList;
      savedList.push(movie);
      this.setState({ savedList });
    }
  }

  render(){
    return (
      <div className="container">
        <div className="header">
          <h1>Lambda Movie Selector</h1>
          <div className="header-buttons-container">
            <div className="button">
              <Link to="/">Home</Link>
            </div>
            <div className="button">
              <Link to="/movies/add">Add</Link>
            </div>
          </div>
        </div>

        <div className="saved-list-and-movie-list-container">
          <SavedList list={this.state.savedList} />

          <Switch>

            <Route exact path="/" component={MovieList} />

            <Route path="/movies/add" render={ (props) =>
              <MovieForm {...props} title={this.state.title}
                                    director={this.state.director}
                                    metascore={this.state.metascore}
                                    stars={this.state.stars}
                                    handleChange={this.handleChange}
                                    handleMovieSubmit={this.handleMovieSubmit} /> }
            />

            <Route path="/movies/:id" render={(props) => {
              return ( <Movie {...props} addToSavedList={this.addToSavedList}
                                        handleSetData={this.handleSetData} /> )}}
            />

          </Switch>

        </div>
      </div>
    )
  }
}

export default withRouter(App);
