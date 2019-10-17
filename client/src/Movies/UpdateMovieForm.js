import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';

export default function UpdateMovieForm(props) {
  const [movieEdit, setMovieEdit] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  });
  console.log('UpdateMovieForm.js props: ', props);

  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, []);

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log('UpdateMovieF.js .get res:', res);
        setMovieEdit(res.data);
      })
      .catch(err => console.log(err.response));
  };

  const changeHandler = e => {
    e.preventDefault();

    setMovieEdit({
      ...movieEdit,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='update-movie-form-container'>
      <h1>Update Movie Form</h1>
      <MovieCard movie={movieEdit} />
      <form>
        <input
          type='text'
          name='title'
          onChange={changeHandler}
          placeholder='Movie Title'
          value={movieEdit.title}
        />
        <div className='baseline' />

        <input
          type='text'
          name='director'
          onChange={changeHandler}
          placeholder='Director'
          value={movieEdit.director}
        />
        <div className='baseline' />
        <input
          type='number'
          name='metascore'
          onChange={changeHandler}
          placeholder='Director'
          value={movieEdit.metascore}
        />
        <div className='baseline' />

        <button className='save-button'>Update</button>
      </form>
    </div>
  );
}
