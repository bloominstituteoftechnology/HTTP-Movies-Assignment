import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <div>
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
          <Link key={movie.id +100} to={`/update-movie/${movie.id}`}>
            <button>Update Movie</button>
          </Link>
          </div>
        ))
      }
    </div>
  );
}

export default MovieList;
