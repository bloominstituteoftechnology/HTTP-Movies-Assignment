import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialFormValues = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddMovie = () => {
  const history = useHistory();
  const [newMovie, setNewMovie] = useState(initialFormValues);

  const changeValue = (e) => {
    e.preventDefault();
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };

  const addStars = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setNewMovie({
      ...newMovie,
      stars: value.split(","),
    });
  };

  const submitNewMovie = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then((res) => {
        console.log(res);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={submitNewMovie}>
        <label>
          Movie Title:
          <input
            type="text"
            name="title"
            value={newMovie.title}
            onChange={changeValue}
          />
        </label>
        <label>
          Movie Director:
          <input
            type="text"
            name="director"
            value={newMovie.director}
            onChange={changeValue}
          />
        </label>
        <label>
          Movie Metascore:
          <input
            type="text"
            name="metascore"
            value={newMovie.metascore}
            onChange={changeValue}
          />
        </label>
        <label>
          Movie Stars:
          <input
            type="text"
            name="stars"
            value={newMovie.stars}
            onChange={addStars}
          />
          <button>Add Movie</button>
        </label>
      </form>
    </>
  );
};

export default AddMovie;
