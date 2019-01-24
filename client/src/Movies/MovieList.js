import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieCreate from './MovieCreate';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    // fill me in with an HTTP Request to `localhost:5000/api/movies`
    axios.get('http://localhost:5000/api/movies')
    .then( res => {
      this.setState({ movies: res.data });  
    })
    .catch( err => {
      console.log(err);
    })
  }

  createMovie = (event, movie) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/movies', movie)
    .then(res => {
      this.setState({movies: res.data});
    })
    .catch(err => {
      console.log(err);
    })
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <Route 
          path="/movies/add" 
          render={() => 
            <MovieCreate createMovie={this.createMovie}/>}
        />
        <Route exact   
          path="/"
          render={() => 
            <div className="movie-list">
              {this.state.movies.map(movie => (
                <MovieDetails key={movie.id} movie={movie} />
              ))}
            </div>}
        /> 
      </div>
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
