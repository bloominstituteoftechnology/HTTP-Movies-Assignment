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
      .then(res => {
        console.log("response:",  res.data)
        this.setState({ movies: res.data })
      })
      
      .catch(err => console.log(err.response));
  }

    // deleteMovie = id =>{
  //   // console.log("delete movie:", id);
  //   axios
  //     .delete(`http://localhost:5000/api/movies/${id}`)
  //     .then(res =>{
  //       this.setState({ movies: res.data})
  //     })
  //     .catch(err => console.log("Error: ", err))
  // }


  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          // <MovieDetails key={movie.id} movie={movie} />
          <MovieDetails key={movie.id} movie={movie} deleteMovie={this.deleteMovie}/>
        ))}
      </div>
    );
  }
}

// function MovieDetails({ movie }) {
  function MovieDetails(props) {
  return (
    // 
    <Link to={{ pathname:`/movies/${props.movie.id}`}} >
    <MovieCard movie={props.movie}  />
    </Link>
  );
}
