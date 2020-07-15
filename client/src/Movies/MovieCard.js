import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';

import './MovieCard.css';

const MovieCard = props => {
  const { push } = useHistory();

  console.log('MoveCard props:', props);
  const { title, director, metascore, stars, id, setMovie } = props.movie;

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:7000/api/movies/${id}`).then(res => {
      axios
        .get(`http://localhost:7000/api/movies`)
        .then(res => props.setMovieList(res.data));
      push(`/`);
    });
  };
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
      <button onClick={() => push(`/edit-movie/${id}`)}>Edit</button>
      <button
        onClick={e => {
          deleteMovie(e);
          push(`/`);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default MovieCard;
