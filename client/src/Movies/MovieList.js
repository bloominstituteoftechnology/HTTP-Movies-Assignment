import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";


function MovieList(props) {
  console.log(props)
  
  return (
    <div className="movie-list">
      {
      props.movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  )
}

export default MovieList;
