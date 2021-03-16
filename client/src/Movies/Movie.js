import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log("error", err));
  };

  const { id } = useParams();
  console.log("id fetched with useParams: ", id);

  const saveMovie = () => {
    addToSavedList(movie);
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
      {/* <button onClick={(evt) => history.push(`/update-movie/${movie.id}`)}>
        Update
      </button> */}

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className="update-button"onClick={(evt) => history.push(`/update-movie/${movie.id}`)}>
        Update
      </div>

      <div className="delete-button">
        Delete
      </div>

    </div>
  );
}

export default Movie;
