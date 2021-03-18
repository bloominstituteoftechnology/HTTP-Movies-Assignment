import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const history = useHistory();
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

  const goToUpdateMovie = () => {
    history.push(`/update-movie/${movie.id}`)
  };


  const deleteMovie = (e) => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      console.log("response from deleteMovie: ", res);

      const updatedMovies = movies.filter(movie => {
        return movie.id !== id
      });
      console.log(id, "id")
      setMovieList(updatedMovies);
      console.log("updatedMovies: ", updatedMovies)
    
      history.push(`/`);

    })
    .catch(err => console.log("error:", err))
  
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

      <div className="update-button"onClick={goToUpdateMovie}>
        Update
      </div>

      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
