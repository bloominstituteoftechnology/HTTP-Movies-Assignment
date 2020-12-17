import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const {id} = useParams();
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

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  const updateHandler = () => {
    push(`/update-movie/${id}`)
  }

  const deleteHandler = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        push('/')
      })
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button onClick={updateHandler}>
        Update
      </button>

      <button onClick={deleteHandler}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
