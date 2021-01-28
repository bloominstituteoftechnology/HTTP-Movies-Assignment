import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList }) {
  const { push } = useHistory();
  const { id } = useParams();
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

  const handleEditClick = () =>{
    push(`/movie-update/${id}`)
  }

  // const handleDeleteClick = () =>{
  //   axios.delete(`http://localhost:5000/api/movies/${id}`)
  //   .then((res) =>{
  //     setMovieList(res.data);
  //     push('/');
  //   })
  //   .catch((err) =>{
  //     console.log(err);
  //   })
  // }

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
      <div className='edit-button' onClick={handleEditClick} >Update Movie</div>
      <button /*onClick={handleDeleteClick}*/ >Delete Movie</button>
    </div>
  );
}

export default Movie;
