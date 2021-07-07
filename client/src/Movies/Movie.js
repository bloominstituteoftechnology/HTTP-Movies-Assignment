import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const history = useHistory();
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

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then((res) =>  {
      console.log(res)
      history.push('/')
    })
    .catch((err) => console.log(err));

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

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={() => history.push(`/update-movie/${movie.id}`)}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Movie;
