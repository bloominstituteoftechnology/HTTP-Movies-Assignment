import React, { useState } from 'react';
import axios from "axios";

const initialMovie = {
  title: '',
  director: '',
  metascore: 1,
  stars: ['Moe', 'Larry', 'Curley'],
};

const AddMovie = (props) => {
  const [newMovie, setNewMovie] = useState(initialMovie);

  const handleChanges = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'metascore') {
      value = parseInt(value, 10);
    }
    if (e.target.name === 'stars') {
      value = value.split(',');
    }
    setNewMovie({
      ...newMovie,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, newMovie)
      .then((res) => {
        console.log(res);
        props.setMovieList(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>Add Movie</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type='text'
          name='title'
          onChange={handleChanges}
          value={newMovie.title}
        />
        <label htmlFor="director">Director</label>
        <input
          type='text'
          name='director'
          onChange={handleChanges}
          value={newMovie.director}
        />
        <label htmlFor="metascore">Metascore</label>
        <input
          type='number'
          name='metascore'
          onChange={handleChanges}
          value={newMovie.metascore}
        />
        <label htmlFor='stars'>Stars</label>
        <input
          type='text'
          name='stars'
          onChange={handleChanges}
          value={newMovie.stars}
        />
        <button type='submit'>Add Movie</button>
      </form>
    </>
  );
};

export default AddMovie;