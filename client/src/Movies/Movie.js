import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props) {
  console.log(props);
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const routeToEditForm = e => {
    e.preventDefault();
    history.push(`/update-movie/${movie.id}`)
  };

  const deleteMovie = e => {
    e.preventDefault();
    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      console.log(res);
      props.setMovieList(res.data);
      props.history.push('/');
    })
    .catch(err => console.log(err));
  };

  // const handleUpdate = id => {
  //   //e.preventDefault();
  //   history.push(`/update-movie/${movie.id}`);
  // };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}> Save </div>
      <div onClick={routeToEditForm}> Edit </div>
      <div onClick={deleteMovie}>Delete</div>
    </div>
  );
}

export default Movie;
