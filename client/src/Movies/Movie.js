import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom";

import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movies, getMovies }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const deleteMov = () => {
    const id = match.params.id;
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log("Delete:", res);
        getMovies(movies);
        history.push("/");
      })
      .catch(err => console.log("Delete error: ", err));
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="update-button" onClick={() => {history.push(`/update-movie/${match.params.id}`);}}>
        Update
      </div>
      <div className="delete-button" onClick={deleteMov}>
        Delete
      </div>
    </div>
  );
}

export default Movie;