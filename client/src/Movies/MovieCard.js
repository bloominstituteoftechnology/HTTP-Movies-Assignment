import React from "react";
import { withRouter } from "react-router-dom";

const Button = withRouter(({ history, id }) => (
  <button
    type="button"
    onClick={() => {
      console.log({ history });
      history.push(`/edit-movie/${id}`);
    }}
  >
    Edit
  </button>
));

const MovieCard = (props) => {
  console.log("MoveCard props:", props);
  const { title, director, metascore, stars, id, setMovie } = props.movie;

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

      {stars.map((star) => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <Button id={id} />
    </div>
  );
};

export default MovieCard;
