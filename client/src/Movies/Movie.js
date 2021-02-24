import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import MovieCard from "./MovieCard";
import axios from "axios";

function Movie({ movieList, addToSavedList, setMovieList }) {
  const { push } = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = () => {
    push(`/update-movie/${params.id}`);
  };

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        const updatedMovieList = movieList.filter((movie) => {
          return movie.id !== res.data;
        });
        setMovieList(updatedMovieList);
        console.log(res);
      })
      .catch((err) => console.log(err));
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
      <div className="edit-button" onClick={editMovie}>
        Edit
      </div>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="delete-button" style={{ top: 180 }} onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
