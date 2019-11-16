import React from 'react';
import {Link} from "react-router-dom"

const MovieCard = props => {
  
  return (
    <div className="movie-card">
      <h2>{props.movie.title}</h2>
      <div className="movie-director">
        Director: <em>{props.movie.director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{props.movie.metascore}</strong>
      </div>
      <h3>Actors</h3>       
        <div className="movie-star">
          {props.movie.stars}
        </div>

      
      <Link to={`/update-movie/${props.movie.id}`} >Edit Movie</Link>
    </div>
  );
};

export default MovieCard;
