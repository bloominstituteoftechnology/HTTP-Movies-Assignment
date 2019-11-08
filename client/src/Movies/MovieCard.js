import React from 'react';

function MovieCard(props){
  // const { title, director, metascore, stars } = props.movie;

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
      {props.movie.stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}

    </div>
  );
};

export default MovieCard;



      