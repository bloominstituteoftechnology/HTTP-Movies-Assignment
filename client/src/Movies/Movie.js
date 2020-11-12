import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import updateForm from '../UpdateForm'

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

  const handleDelete = () => {
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then((res) => {
        props.setMovie(
            props.movieList.filter((movie) => {
                if(movie.id === id) {
                    return res.data
                } else {
                    return movie
                }
            })
        )
        push('/')
    })
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
      <button onClick={()=>{
                    push(`/movie-update/${updateMovie.id}`);
                    }} className="update-button">
                    Update
                </button>

                <button onClick={handleDelete} className="delete-button">
                    Delete
                </button>
    </div>
  );
}

export default Movie;
