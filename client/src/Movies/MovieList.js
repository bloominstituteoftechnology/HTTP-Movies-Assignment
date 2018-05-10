import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard'
import { Link } from 'react-router-dom';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/movies')
      .then(response => {
        this.setState(() => ({ movies: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id}  movie={movie} />
        ))}
          {/* <Link to={`/movies/${movie.id}`} key={movie.id} ><MovieDetails  movie={movie} /></Link> */}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  const { title, director, metascore, stars, id } = movie;
  console.log(id);
  return (
    <Link to={`/movies/${id}`} key="title" >
      <MovieCard movie={movie} />
    </Link>
  );
}
