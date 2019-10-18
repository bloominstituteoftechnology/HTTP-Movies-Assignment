import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddMoviePreview from './AddMoviePreview';

export default function AddMovieForm(props) {
  const [newMovie, setNewMovie] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  });
  const [newStar, setNewStar] = useState('');
  /* console.log('AddMovie.js newMovie: ', newMovie); */
  /* console.log('AddMovieFrom.js props: ', props); */
  const handleChanges = e => {
    e.preventDefault();

    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value
    });
  };

  const handleStar = e => {
    e.preventDefault();
    setNewStar(e.target.value);
  };

  const setStar = str => {
    setNewMovie({
      ...newMovie,
      stars: [...newMovie.stars, str]
    });
    setNewStar('');
  };

  const submitNewMovie = (e, obj) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, obj)
      .then(res => {
        console.log('AddMovieForm.js .post res.data:', res.data);
        props.addNewMovie(res.data);
        setNewMovie({
          title: '',
          director: '',
          metascore: '',
          stars: []
        });
      })
      .catch(err => {
        console.log('AddMovieForm.js err', err);
      });
  };

  return (
    <div>
      <h1>Add Movie: </h1>
      <div className='add-movie-form'>
        <form action=''>
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
            min='0'
            max='100'
            onChange={handleChanges}
            placeholder='Metascore'
            type='number'
            value={newMovie.metascore}
          />
          <button
            onClick={() => {
              setStar(newStar);
            }}
            type='button'
          >
            +
          </button>
          <input
            onChange={handleStar}
            placeholder='Actor'
            name='stars'
            type='text'
            value={newStar}
          />

          <button
            onClick={e => {
              submitNewMovie(e, newMovie);
            }}
            type='submit'
          >
            Add Movie
          </button>
        </form>
        <AddMoviePreview className='add-movie-card' movie={newMovie} />
      </div>
    </div>
  );
}
