import React, { Component } from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import MovieCard from './MovieCard';

const blankMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: "",
}
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      newMovie: {
        title: "",
        director: "",
        metascore: "",
        stars: "",
      }
    };
  }

  componentDidMount() {
    // fill me in with an HTTP Request to `localhost:5000/api/movies`
    
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }));
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({
        newMovie: {
            ...this.state.newMovie,
            [e.target.name]: e.target.value.split(","),
        }
    })
  }

  addMovie = e => {
    e.preventDefault();
    axios
        .post("http://localhost:5000/api/movies", this.state.newMovie)
        .then(res => this.setState({
            movies: res.data,
            newMovie: blankMovie,
        }))
  }

  render() {
    return (
      <div className="movie-list">
        <form>
          <input onChange={this.changeHandler} 
          type="text" 
          name="title"
          placeholder="title"
          value={this.state.newMovie.title}
          ></input>
          <input onChange={this.changeHandler} 
          type="text"
          name="director" 
          placeholder="director"
          value={this.state.newMovie.director}
          ></input>
          <input onChange={this.changeHandler} 
          type="number" 
          name="metascore"
          placeholder="metascore"
          value={this.state.newMovie.metascore}
          ></input>
          <input onChange={this.changeHandler} 
          type="text" 
          name="stars"
          placeholder="stars"
          value={this.state.newMovie.stars}
          ></input>
        </form>
        <button onClick={this.addMovie}>Add Movie</button>
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
