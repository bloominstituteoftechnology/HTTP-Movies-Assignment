import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Link } from 'react-router-dom';
import MovieCard from './MovieCard';

import reloadPage from '../utils/reloadPage';

const Movie =props => {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  console.log(props)

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const handleDelete = e => {
    e.preventDefault();
    console.log(movie.id)
    axios.delete (`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      console.log(res)
      props.history.push('/')
      reloadPage();
    })
    .catch(err => console.log('Problem deleting', err))
  }

  const saveMovie = () => {
    props.addToSavedList(movie);
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
      <button onClick={handleDelete}>Delete Movie</button>
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${movie.id}`}>
        <div>Update</div>
      </Link>
    </div>
  );
}

export default Movie;
