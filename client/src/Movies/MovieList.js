import React from "react";
import { Link, withRouter } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
  
            <h1> 
            {movie.title}          
            </h1>           

          </Link>
        ))
      }
    </div>
  );
}

export default withRouter(MovieList);
