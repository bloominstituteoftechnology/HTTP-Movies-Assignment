import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useHistory } from 'react-router-dom';

function Movie({ addToSavedList, deleteMovies }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        console.log(res.data);
      })
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

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
          .then(res => {
            deleteMovies(res.data);
            //res.data
            push('/');
          });
        };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button onClick={() => push(`/update-movie/${movie.id}`)}>
          Edit
      </button>

      <button onClick={deleteMovie}>
          Delete
      </button>
    </div>
    
  );
}

export default Movie;
