import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  let history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };
  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = (movie) => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie}`)
      .then((res) => {
        history.push('/movies');
      })
      .catch((err) => {
        console.log('deleteMovie error: ', err);
      })
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);
  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const updateMovie = (movie) => {
    history.push(`/update-movie/${movie}`);
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button onClick={() => updateMovie(movie.id)}>Update</button>
      <button onClick={() => deleteMovie(movie.id)}>Delete</button>

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}
export default Movie
