import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

// import UpdateMovie from "./updateMovie";

function Movie({ addToSavedList, movieList, setMovieList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();
  const { id } = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleUpdateClick = () => {
    push(`/update-movie/${movie.id}`);
  };

  const handleDeleteClick = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        getMovieList();
        // setMovieList(
        //   movieList.filter((item) => {
        //     return item.id !== movie.id;
        //   })
        // );
        push("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
      <button onClick={handleDeleteClick} className="delete-button">
        Delete
      </button>
      <div className="update-button" onClick={handleUpdateClick}>
        UpdateMovie
      </div>
    </div>
  );
}

export default Movie;
