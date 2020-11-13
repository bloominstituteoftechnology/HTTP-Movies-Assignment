import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import AddMovie from './AddMovie'

function MovieList({ movies, getMovieList}) {
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
      <AddMovie getMovieList ={getMovieList} id={movies.length -1}/>
    </div>
  );
}

export default MovieList;
