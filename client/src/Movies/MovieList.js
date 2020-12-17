import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosCall } from "../utils/axiosCall";
import MovieCard from "./MovieCard";


const MovieList = () => {
const [renderMovies, setRenderMovies] = useState([])

useEffect(() => {
  const refreshMovieList = () => {
     axiosCall()
      .get('/api/movies/')
      .then(res => {
        setRenderMovies(res.data)
      })
      .catch(err => console.log(err))
  }
     refreshMovieList()
}, [])

  return (
    <div className="movie-list">
      {
        renderMovies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
