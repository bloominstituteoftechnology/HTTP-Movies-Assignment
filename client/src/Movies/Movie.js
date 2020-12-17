import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { axiosCall } from "../utils/axiosCall";


function Movie({ addToSavedList }, props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory()
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  console.log(props.movieList)

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const updateMovie = e => {
    e.preventDefault()
    axiosCall()
      .put(`/api/movies/{$params.id}`, movie)
      .then(res => {
     props.setMovieList(res.data)
   })
   .catch(err => (console.log('ERROR: ', err)))
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
