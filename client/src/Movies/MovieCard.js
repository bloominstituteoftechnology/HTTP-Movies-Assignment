import React from "react";

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;

  


  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors: </h3> <em>{stars}</em>


            {/*  */}
      
    </div>
  );
};

export default MovieCard;
