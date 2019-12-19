import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateForm from "./UpdateForm";

export default class MovieList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     movies: []
  //   };
  // }
  
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        console.log('res', res);
        this.props.setMovies(res.data )
      }
        )
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <div className="movie-list">
        {console.log('props', this.props)}
         {/* update movice Route */}
         {/* <Route path= '/update-movies/:id' render={ props => { return <UpdateForm {...props} 
          movies ={this.state.movies} setMovies = {this.setState} /> }} /> */}

        {this.props.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} history={this.props.history} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie, history }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} history={history} />
    </Link>
  );
}
