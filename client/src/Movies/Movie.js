import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movies }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log("error", err));
  };

  const { id } = useParams(); // useParams returns id as a "string"
  const idNumber = Number(id); // idNumber = number

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = (e) => {
    console.log("deleteMovie has fired")
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

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className="update-button"onClick={(evt) => history.push(`/update-movie/${movie.id}`)}>
        Update
      </div>

      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>

    </div>
  );
}

export default Movie;
