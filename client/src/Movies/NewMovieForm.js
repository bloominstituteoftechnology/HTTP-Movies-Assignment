import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialNewMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const NewMovieForm = ({ updateMovieList }) => {
  const [newMovie, setNewMovie] = useState(initialNewMovie);
  const { push } = useHistory();

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    // if (ev.target.name === 'price') {
    //   value = parseInt(value, 10);
    // }

    setNewMovie({
      ...newMovie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
    .post(`http://localhost:5000/api/movies`, newMovie)
    .then((res)=>{
      updateMovieList()
      push(`/movies/${res.data[res.data.length - 1].id}`);
    })
    .catch(err=>{
      console.log(err);
    });
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={newMovie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={newMovie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={newMovie.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={newMovie.stars}
        />
        <div className="baseline" />

        <button className="save-button">Add New Movie</button>
      </form>
    </div>
  );
};

export default NewMovieForm;