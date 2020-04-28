import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useHistory } from 'react-router-dom';

function Movie({ addToSavedList, deleteMovies, deleteSaved }) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
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

  const unsaveMovie = () => {
    deleteSaved(movie) 
  }

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${id}`)
          .then(res => {
            console.log(res, "A")
            deleteMovies(res.data);
            push('/');
          });
        };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

     
     <div className="buttonz">
     <div className="edit-button" onClick={() => push(`/update-movie/${id}`)}>
          Edit
      </div>

      <div className="delete-button" onClick={deleteMovie}>
          Delete
      </div>

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div onClick={deleteSaved}>
        unSave
      </div>
    </div>
    </div>
    
  );
}

export default Movie;
