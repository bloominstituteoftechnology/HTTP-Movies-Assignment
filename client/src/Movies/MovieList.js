import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
    axios.get(`http://localhost:5000/api/movies`)
    .then(res => {
      this.setState({ movies: res.data });  
    })
    .catch(error => {
      console.log(error) //to-do: show error message to user
    }); 
  }

  submitNewMovie = (movie) => {
    axios.post(`http://localhost:5000/api/movies`, movie)
    .then(res => {
      this.setState({ movies: res.data });  
    })
    .catch(error => {
      console.log(error) //to-do: show error message to user
    });
  }

  render() {    
    return (
      <div className="movie-list">
        <MovieCreate handleSubmit={this.submitNewMovie}/>
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
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
