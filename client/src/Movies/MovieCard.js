import React from 'react';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <p>{title}</p>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">Metascore:<strong>{metascore}</strong></div>
      <p>Actors</p>

      
      <div>{stars}</div>          
    </div>
  );
};
  

export default MovieCard;
