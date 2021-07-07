//Add a delete button in the movie component that makes a DELETE request
//When the call comes back successfully, route the user to /movies where they will see the updated movie list without the deleted movie

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setRefresh }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5001/api/movies/${id}`)
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

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5001/api/movies/${params.id}`)
      .then((res) => {
        console.log(res);
        setRefresh(true);
        push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button
        onClick={() => {
          push(`/update-movie/${params.id}`);
        }}
      >
        {" "}
        Update{" "}
      </button>
      <button onClick={handleDelete}> Delete </button>
    </div>
  );
}

export default Movie;
