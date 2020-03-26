import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import Update from './MovieUpdate'

function Movie({ addToSavedList, movies, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();
  const {id} = useParams();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };
  const updateMovie = e => {
    e.preventDefault();
    history.push(`/update-movie/${match.params.id}`)
  }
  const deleteMovie = e =>{
    e.preventDefault()
    console.log("Before", movies)
    axios 
      .delete(`http://localhost:5000/api/movies/${match.params.id}`)
      .then(resp => {
        console.log(" ",resp)
        const updatedList = movies.filter(film => {
          if (`${film.id}`=== id){

          }else{
            return film
          }
        })
        console.log("Before",updatedList)
        setMovieList(updatedList)
        console.log("After",updatedList)
        history.push("/")
      })
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button  onClick={updateMovie}>Update</button>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
}

export default Movie;
