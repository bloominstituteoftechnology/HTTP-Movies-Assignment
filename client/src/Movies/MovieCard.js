import React from 'react';

const MovieCard = ({ movie }) => {
  const { title, director, metascore, stars, src } = movie;
  return (
    <div className="movie-card-wrapper">
      <img className="movie-img" src={src} alt="" />
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>
        <ul className="movie-stars">
          {stars.map(star => (
            <li key={star} className="movie-star">
              {star}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieCard;
