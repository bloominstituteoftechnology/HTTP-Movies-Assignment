import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  // const routeToEditForm = e => {
  //   e.preventDefault();
  //   props.history.push(`/update-movie/${movie.id}`)
  // }

  const deleteMovie = e => {
    e.preventDefault();
    axios
    .delete(`http://localhost:5000/api/movies/${props.match.params.id}`)
    .then(res => {
      console.log(res);
      props.history.push('/');
    })
    .catch(err => console.log(err));
  };

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
      <button onClick={() => props.history.push(`/update-movie/${props.match.params.id}`)}>Edit</button>
      <button onClick={deleteMovie}>Delete</button>
    </div>
  );
}

export default Movie;
