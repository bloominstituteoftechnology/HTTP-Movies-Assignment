import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import React from "react";

function MovieList({ movies }) {
  console.log("movies: ", movies);
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}

export default MovieList;
