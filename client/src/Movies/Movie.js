import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, removeMovieById, history }) {  // deconstructed props
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

    // ********** Add the function to delete movie ********** //
    const deleteMovie = e => {
      e.preventDefault();
      //make an axios delete request
      //in the .then, updata with props.setMovies and navigate to the shop
      axios.delete(`http://localhost:5000/api/movies/${movie.id}`).then(res => {
        removeMovieById(res.data);
        //res.data
        history.push('/');
      });
    };
    // ********** Add the function to delete movie ********** //

    const updateMovie = e => {
      history.push(`/update-movie/${movie.id}`);
    }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <div className='delete-button' onClick={deleteMovie} >
        Delete
      </div>
      <div className='update-button' onClick={updateMovie} >
        Update
      </div>
    </div>
  );
}

export default Movie;
