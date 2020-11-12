import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, removeFromSavedList, updateMovieList }) {
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

  const unsaveMovie = () => {
    removeFromSavedList(movie);
  };

  const updateMovie = () => {
    push(`/update-movie/${params.id}`)
  }

  const deleteMovie = () => {
    unsaveMovie()
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
      <MovieCard movie={movie} />
      <div className="save-button-wrapper">
        <div className="save-button" onClick={saveMovie}>
          Save
        </div>
        <div className="save-button" onClick={unsaveMovie}>
          Remove from Saved
        </div>
        <div className="save-button" onClick={updateMovie}>
          Update Movie
        </div>        
        <div className="save-button" onClick={deleteMovie}>
          Delete Movie
        </div>
      </div>
    </div>
  );
}

export default Movie;
