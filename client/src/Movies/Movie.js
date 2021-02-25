import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList }) {
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

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleUpdateClick = () => {
    push(`/update-movie/${params.id}`)
  };

  const handleDeleteClick = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(() => {
      axios
      .get('http://localhost:5000/api/movies')
      .then(res => {
        setMovieList(res.data);
        push('/');
      })
    })
    .catch(err => {
      console.log(err)
    });
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="update-button" onClick={handleUpdateClick}>
        Update
      </div>
      <div className="delete-button" onClick={handleDeleteClick}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
