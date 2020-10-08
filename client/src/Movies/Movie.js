import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import UpdateMovie from "./UpdateMovie";
import { Route } from "react-router-dom";
function Movie({ addToSavedList }) {
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

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Route path="/update-movie/:id">
        <UpdateMovie movie={movie} />
      </Route>
      {/* Added new route for the button i created */}
        <button onClick={deleteMovie}> Delete Movie</button>
      <Link key={movie.id} to={`/update-movie/${movie.id}`}>
        <button> Update Movie </button>
      </Link>
      <Link key={movie.id} to={`/add-movie/`}>
        <button> Add Movie </button>
      </Link>
    </div>
  );
}

export default Movie;
