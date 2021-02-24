import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList, getMovieList}) {
  const [movie, setMovie] = useState(null);
  const { push } = useHistory()
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

  const editMovie = () => {
    push(`/update-movie/${movie.id}`)
  }

  const deleteMovie =(e) => {
    e.preventDefault();

    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then((res) => {
      console.log('this is RES IN DELETE,',res)
      setMovieList(movieList.filter(item => {
        return item.id !== movie.id
      }))
      push('/')
    })
    .catch((err) => {
      console.log('ERROR DELETING:', err)
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
    <button className='edit-button' onClick={editMovie}>Edit This Movie</button>
    <button className='delete-button' onClick={deleteMovie}>Delete Movie</button>

    
    </div>
  );
}
//Had to put delete n edit in same div for it to work.. weird 
export default Movie;
