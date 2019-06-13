import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';

import MovieForm from './MovieForm'
import MovieCard from './MovieCard';
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/movies')
    .then(res => {
        this.setState({
            movies: res.data
        })
    })
    .catch(err => console.log(err))
  }

  addMovie = (movie) => {
      axios.post('http://localhost:5000/api/movies' , movie)
      .then(res => {
          this.setState({
              movies: res.data
          })
          this.props.history.push('/dashboard')
      })
      .catch(err => console.log(err))
  }
  
  render() {
    return (
        <Switch>
        <Route  path = "/dashboard/add" render={ (props) => {
            return(<MovieForm {...props} addMovie = {this.addMovie} />)
        }} />
        <>
      <div className="movie-list">
        <div className="add-button">
          <Link to="/dashboard/add">Add Movie</Link>
        </div>
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
      </>
      </Switch>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
