import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, history }) {
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

  const updateHandler = (evt) => {
    evt.preventDefault();
    history.push(`/update-movie/${params.id}`)
  }

  const deleteHandler = (evt) => {
    evt.preventDefault()
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log(res)
        window.location = '/'
        // setMovieList(movieList.filter((item) => item.id !== movie.id))
        // history.push('/')
      })
      .catch(err => console.log(err))
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
      <div className="save-button" onClick={updateHandler}>
        Update
      </div>
      <div className="save-button" onClick={deleteHandler}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
