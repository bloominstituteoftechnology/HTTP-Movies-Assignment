import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './MovieCard';
import MovieCreate from './MovieCreate';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [], 
      title: '',
      director: '',
      metascore: '',
      stars: []
    };
  }

  componentDidMount() {
    // fill me in with an HTTP Request to `localhost:5000/api/movies`
    axios
    .get('http://localhost:5000/api/movies')
    .then(res => {
      console.log(res)
      this.setState({ movies: res.data });
    })
    .catch(err => {
      console.log(err)
    })
  }

  onChange=e=>{
    if(e.target.name === 'stars'){
      let splittedStars = e.target.value.split(',')
      this.setState({ [e.target.name]: splittedStars })
    }else{
      this.setState({ [e.target.name]: e.target.value })
    }
    
  }

  handleSave = (e) => {
    e.preventDefault();
    const newObj = {
      title: this.state.title,
      director: this.state.director,
      metascore: this.state.metascore,
      stars: this.state.stars
    }
    axios
    .post('http://localhost:5000/api/movies', newObj)
    .then(res =>{
      console.log('handle save', res)
      this.setState({ movies: res.data })
    })
    .catch(err => {
      console.log(err)
    })
    
  }

  render() {
    return (
      <div>
        
        <MovieCreate handleSave={this.handleSave} onChange={this.onChange} propsData={this.state} />
      <div className="movie-list">

        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>

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
