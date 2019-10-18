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
  /* console.log('UpdateMovieForm.js props: ', props); */
  console.log('Upd.MovieForm.js movieEdit', movieEdit);
  let id = props.match.params.id;
  useEffect(() => {
    fetchMovie(id);
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

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieEdit)
      .then(res => {
        // needs to call setItems
        console.log('Ud.MovieForm.js res ', res);
        props.history.push(`/movies`);
      })
      .catch(err => console.log(err.response));
  };

  const submitNewMovie = (e, obj) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/movies`, obj);
  };

  return (
    <div className='update-movie-form-container'>
      <h1>Update Movie Form</h1>

      <form onSubmit={handleSubmit}>
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
        <input
          type='number'
          name='metascore'
          onChange={changeHandler}
          placeholder='Director'
          value={movieEdit.metascore}
        />
        <div className='baseline' />

        <button type='submit' className='save-button'>
          Update
        </button>
        <MovieCard movie={movieEdit} />
      </form>
    </div>
  );
}
