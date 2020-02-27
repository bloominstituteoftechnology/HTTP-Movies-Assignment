import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';


const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  // const match = useRouteMatch();
  const {id} = useParams();
  console.log(id);
  

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res);
        setMovie(res.data)})
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

   const handleUpdate = e => {
    e.preventDefault();
    props.history.push(`/update-movie/${movie.id}`)
  }

  const handleDelete = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      props.setMovie(res.data);
      props.history.push('/');
    })
  }

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>

      <div className='update-movie-button' onClick={handleUpdate}>
        Edit Movies
      </div>

      <div className='delete-button' onClick={handleDelete}>
        Remove Movie From List
      </div>

    </div>
  );
}

export default Movie;
