import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import MovieList from "./MovieList";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovieForm = (props) => {
  const [updateMovie, setUpdateMovie] = useState(initialItem);
  console.log(updateMovie);
  useEffect(() => {
    const editingMovie = props.movies.find((film) => {
      return film.id === Number(props.match.params.id);
    });

    if (editingMovie) {
      setUpdateMovie(editingMovie);
    }
  }, [props.movies, props.match.params]);

  const changeHandler = (e) => {
    e.preventDefault();

    setUpdateMovie({ ...updateMovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Number(props.match.params.id);
    props.updateMovieList(id, updateMovie);
  };

  return (
    <div className="update-form">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={changeHandler}
          value={updateMovie.title}
        />
        <br />
        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={changeHandler}
          value={updateMovie.director}
        />
        <br />
        <input
          type="number"
          name="metascore"
          placeholder="Metascore"
          onChange={changeHandler}
          value={updateMovie.metascore}
        />
        <br />
        <input
          type="array"
          name="stars"
          placeholder="Stars"
          onChange={changeHandler}
          value={updateMovie.stars}
        />
        <br />
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
