import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import axios from 'axios';
import { useHistory,useParams } from "react-router";

function MovieList({movies}) {
 
  return (
    <div className="movie-list">
      <Link key = {877} to = {'/add-movie'} >
        <button>Add Movie</button>
      </Link>
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
