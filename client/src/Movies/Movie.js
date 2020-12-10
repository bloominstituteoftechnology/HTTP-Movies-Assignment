import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";


function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };


  const updateMovie = () => {
    push(`/update-movie/${params.id}`)
  }


  const deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then((res) =>{
      console.log(res.data);
      setMovieList(movieList.filter(item => item.id !== movie.id))
      push('/')
    })
    .catch(err => console.error(err));
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
      <button className="update" onClick={updateMovie}>Update Movie</button>
      <button className="delete" onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
}

export default Movie;

// Add a delete button in the movie component that makes a DELETE request
// When the call comes back successfully, route the user to /movies where they will see the updated movie list without the deleted movie