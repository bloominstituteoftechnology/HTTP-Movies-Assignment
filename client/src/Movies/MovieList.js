import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MovieCard from './MovieCard'
export default class MovieList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: [],
      newMovie: ''
    }
  }
  componentDidMount () {
    // fill me in with an HTTP Request to `localhost:5000/api/movies`
    axios
      .get('http://localhost:5000/api/movies/')
      .then((res) => this.setState({ movies: res.data }))
      .catch((err) => console.log(err))
  }

  handleChange = (e) => {
    this.setState({ newMovie: e.target.value })
  }

  render () {
    return (
      <div>
        <form>
          <input
            placerholder='add new movie'
            value={this.state.newMovie}
            onChange={this.handleChange}
          />
        </form>
        <div className='movie-list'>
          {this.state.movies.map((movie) => (
            <MovieDetails key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    )
  }
}

function MovieDetails ({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  )
}
