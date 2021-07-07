import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, NavLink, useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateMovieForm from "./UpdateMovieForm"

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {id} =useParams();
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

  const deleteMovie = (e) =>{
    e.preventDefault();
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then((res) =>{
      console.log("KH Movies.js: deleteMovie: axios delete", res)
      push('/movies')

    })
    .catch((err) => console.error(`unable to delete ${id}`,err))

  }

  const addMovie = (e) =>{
    e.preventDefault();
    push(`/add-movie`)
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button className="update-button" onClick={() =>{
        push(`/update-movie/${id}`)
      }}>
        Edit
      </button>
<button className="delete-button" onClick={deleteMovie}>
  Delete Movie
</button>
<button className="add-movie-button" onClick={addMovie}>Add Movie</button>
    </div>
  );
}

export default Movie;
