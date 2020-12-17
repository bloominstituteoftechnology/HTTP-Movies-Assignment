import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const onDelete = (e) => {
    const id = params.id;
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        if (res.statusText === "Accepted") {
          push('/');
        }
      });
  };

  const routeToEdit = (e) => {
    e.preventDefault();
    const id = params.id;
    push(`/update-movie/${id}`);
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

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="delete-button" onClick={onDelete}>
        Delete
      </div>
      <div className="Edit-button" onClick={routeToEdit}>
        Edit
      </div>
    </div>
  );
}

export default Movie;
