import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies, removeMovie }) {
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          //<Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard key={movie.id} removeMovie={removeMovie} update={true} movie={movie} />
          //</Link>
        ))
      }
    </div>
  );
}

export default MovieList;
