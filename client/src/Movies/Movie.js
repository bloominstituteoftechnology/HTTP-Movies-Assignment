import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, deleteMovie }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };
  const handleEditClick = () => {
    push(`/update-movie/${params.id}`);
  };

  const handleDeleteClick = () => {
   deleteMovie(params.id);
  };
 
  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div onClick={handleEditClick} className="edit-button">
        Edit
      </div>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="delete-button" onClick={handleDeleteClick}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
