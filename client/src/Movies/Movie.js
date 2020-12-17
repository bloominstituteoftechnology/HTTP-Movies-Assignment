import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { axiosCall } from "../utils/axiosCall";


function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory()

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const fetchMovie = id => {
    axiosCall()
      .get(`/api/movies/${id}`)
      .then(res => {
        setMovie(res.data)
      })
      .catch(err => console.log(err.response)
      )};
  
  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = e => {
    push(`/update-movie/${params.id}`)
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
      <div className="edit-button" onClick={updateMovie}>
      Edit Stats</div>
    </div>
  );
}

export default Movie;
