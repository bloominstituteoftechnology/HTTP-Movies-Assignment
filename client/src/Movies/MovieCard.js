import React from 'react';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  const image = require('../singleStar.png');
  return (
    <div className="movie-card">
      <img src={image} alt='single gold star' />
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {/* {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
          <button className='edit-star-btn'>Edit Star</button>
        </div>
      ))} */}
    </div>
  );
};

export default MovieCard;
