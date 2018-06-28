import React from 'react';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie || props;
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

      {stars.map((star, index) => (
        <div onClick={() => props.deleteActor ? props.deleteActor(index) : null} key={star + index} className="movie-star">
          {star}
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
