import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialNewMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const MovieForm = ({ updateMovieList }) => {
  const [newMovie, setNewMovie] = useState(initialNewMovie);
  const { push } = useHistory();

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;

    setNewMovie({
      ...newMovie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const processed = {...newMovie,}
    processed.stars = newMovie.stars.split(', ')
    axios
    .post(`http://localhost:5000/api/movies`, processed)
    .then((res)=>{
      updateMovieList()
      push(`/movies/${res.data[res.data.length - 1].id}`);
    })
    .catch(err=>{
      console.log(err);
    });
  };

  return (
    <div className="wrapper">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
          <div className="form-wrapper">
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={newMovie.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={newMovie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={newMovie.metascore}
        />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={newMovie.stars}
        />

        <button className="save-button">Add New Movie</button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;