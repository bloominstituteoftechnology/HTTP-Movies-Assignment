import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, refreshHandler }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = (e, id) => {
    e.preventDefault()
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        push(`/movies`)
      })
      .catch(err => console.log(err))
      .finally(() => {
        refreshHandler()
      })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button className="edit-button" onClick={() => push(`/update-movie/${movie.id}`)}>Edit</button>
      <button onClick={ (e) => deleteMovie(e, params.id)}>Delete Movie</button>
    </div>
  );
}

export default Movie;
