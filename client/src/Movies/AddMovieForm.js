import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

export default function AddMovieForm(props) {
  const [newMovie, setNewMovie] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  });
  /* console.log('AddMovie.js newMovie: ', newMovie); */
  console.log('AddMovieFrom.js props: ', props);
  const handleChanges = e => {
    e.preventDefault();

    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value
    });
  };

  const submitNewMovie = (e, obj) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, obj)
      .then(res => {
        console.log('AddMovieForm.js .post res:', res.data);
        props.setNewMovie({ movies: res.data });
      })
      .catch(err => {
        console.log('AddMovieForm.js err', err.response);
      });
  };

  return (
    <div>
      <h1>Add Move Form</h1>
      <div className='add-movie-form'>
        <form
          onSubmit={e => {
            submitNewMovie(e, newMovie);
          }}
          action=''
        >
          <input
            required
            name='title'
            onChange={handleChanges}
            placeholder='Movie'
            type='text'
            value={newMovie.title}
          />
          <input
            required
            name='director'
            onChange={handleChanges}
            placeholder='Director'
            type='text'
            value={newMovie.director}
          />
          <input
            required
            name='metascore'
            onChange={handleChanges}
            placeholder='Metascore'
            type='number'
            value={newMovie.metascore}
          />
          <button>Add Movie</button>
        </form>
        <MovieCard movie={newMovie} />
      </div>
    </div>
  );
}
