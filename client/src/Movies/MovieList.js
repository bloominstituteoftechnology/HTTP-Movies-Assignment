import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieForm from './MovieForm'
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
      console.log(response)
      this.setState({ movies: response.data});
    })
    .catch(err=>console.log(err))
    
  }

  addMovie = (movie) => {
    axios
			.post(`http://localhost:5000/api/movies`, movie)
			.then((response) => {
				this.setState({
					movies: response.data
				});
			})
			.catch((err) => console.log(err));
  }
  render() {
    return (
      <React.Fragment>
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
      <MovieForm addMovie={this.addMovie}/>
      </React.Fragment>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`} style={{textDecoration: 'none'}}>
      <MovieCard movie={movie} style={{color: 'white'}} />
    </Link>
  );
}
