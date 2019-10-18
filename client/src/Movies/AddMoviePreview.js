import React from 'react';

export default function AddMoviePreview(props) {
  const { title, director, metascore, stars } = props.movie;

  return (
    <div className='add-movie-card'>
      <h2>Preview:</h2>
      <h2>{title}</h2>
      <div className='movie-director'>
        Director: <em>{director}</em>
      </div>
      <div className='movie-metascore'>
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className='movie-star'>
          {star}
        </div>
      ))}
    </div>
  );
}
