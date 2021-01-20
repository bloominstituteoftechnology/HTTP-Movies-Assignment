import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Route, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = (e) => {
    e.preventDefault();

    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log(res)
        history.push("/");
      })
      .finally(() => window.location.reload())
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

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="edit-button" 
        onClick={() => {
          history.push(`/update-movie/${movie.id}`);
        }}
      >
        Update
      </div> 
      <div className="delete-button"
        onClick={deleteMovie}
      >
        Delete
      </div>

      
    </div>
  );
}

export default Movie;
