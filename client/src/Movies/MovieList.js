import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }
  deleteMovie = id => {
   
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      console.log(res)
      this.setState({movies:this.state.movies.filter(i => i.id !== id)})
    })
    .catch(err => console.log(err))
  } 
  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <div>
          <button onClick={() => this.deleteMovie(movie.id)}>delete</button>
          <MovieDetails key={movie.id} movie={movie} />
          </div>
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
