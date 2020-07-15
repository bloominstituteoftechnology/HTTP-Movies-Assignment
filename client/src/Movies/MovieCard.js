import React from 'react';
import { Link } from "react-router-dom";

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      {props.update ?
      <Link to={`/update-movie/${props.movie.id}`}>  
      <div className="update-button" >
        Update
      </div>
      </Link>
      :<></>}
      
    </div>
  );
};

export default MovieCard;
