import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

function Movie(props, { addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${match.params.id}`)
      .then(res => {
        props.getMovieList();
        
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <Button className='update-button' variant="contained" color="primary">
        <Link to ={`/update-movie/${match.params.id}`}>Update Movie</Link>
      </Button>
      <Button className='delete-button' variant="contained" color="secondary" onClick={deleteMovie}>
        <Link to='/' > Delete </Link>
      </Button>
    </div>
  );
}

export default Movie;