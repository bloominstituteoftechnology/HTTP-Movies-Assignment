import React from 'react';
import { Link } from 'react-router-dom';


const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;
  return (

    <div className="movie-card">
      <center><h2>{title}</h2></center>
       <center> 
       <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      </center>
      <div className="movie-director">
        <h3>Director</h3>
         <em>{director}</em>
      </div>
    
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <Link to= {`/update-movies/${id}`}> 
      </Link>
    </div>
  );
};

export default MovieCard;
