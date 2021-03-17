import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
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

  const updateMovie = () => {
    push(`/update-movie/${id}`)
  }

  const deleteMovie = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        setMovieList(movieList.filter(item => {
          return item.id !== movie.id
        }))
      })
      .catch(err => console.log(err));
    push('/');
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">

      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button className="edit-button" onClick={updateMovie}>
        Edit
      </button>

      <button className="delete-button" onClick={deleteMovie}>
        Delete
      </button>

    </div>
  );
}

export default Movie;
