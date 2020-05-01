import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const MovieUpdate = (props) => {
  const [movie, setMovie] = useState(initialMovie);

  const changeHandler = e => {
    setMovie({
      ...movie, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios 
      .put(``, movie)
      .then(() => props.history.push('/'))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    axios 
      .get(``)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err))
  })

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.name}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />

        <input
          type="text"
          name="start"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
        />

        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default MovieUpdate;