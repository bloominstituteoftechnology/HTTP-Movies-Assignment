import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router";

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;
  const history = useHistory();
  const deleteMovie = () => {
    axios
          .delete(`http://localhost:5000/api/movies/${id}`)
          .then((res) => {
            console.log(res);
            history.push("/");
          })
          .catch((err) => console.error(err));
  }
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
      <button onClick = {deleteMovie}>Delete Movie</button>
    </div>
  );
};

export default MovieCard;
