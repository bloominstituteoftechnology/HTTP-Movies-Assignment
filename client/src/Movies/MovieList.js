import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      updated: false,
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/movies')
      .then(response => {
        this.setState(() => ({ movies: response.data }));
      })
      .catch(error => {
        console.error('Sorry ', error);
      });
  }

  componentWillReceiveProps(){
    window.location.reload();
  }

  componentDidUpdate(){

  }


  render() {
    return (
      <div className="movie-list">
              <Link to='/movies/add'><div className='add-button'>
                Add Movie
              </div></Link>
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
