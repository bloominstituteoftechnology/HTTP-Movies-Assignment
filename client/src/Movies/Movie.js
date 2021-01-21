import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, updateMovieList, removeMovieFromSavedList }) {
  const [movie, setMovie] = useState(null);
  const { push } = useHistory();
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };


  const updateMovie = () => {
    push(`/update-movie/${params.id}`)
  }

  const deleteMovie = () => {
    removeMovieFromSavedList(movie)
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(()=>{
        updateMovieList()
        push(`/`)
      })
      .catch((err) => console.log(err.response));

  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <div className="button-wrapper">
      <div className="save-button save" onClick={() => addToSavedList(movie)}>
        Save
      </div>
      <div className="save-button" onClick={() => removeMovieFromSavedList(movie)}>
          Remove Movie
        </div>
        <div className="save-button" onClick={updateMovie}>
          Update Movie
        </div>        
        <div className="save-button" onClick={deleteMovie}>
          Delete Movie
        </div>
        </div>
        <MovieCard movie={movie} />
    </div>
  );
}

export default Movie;
