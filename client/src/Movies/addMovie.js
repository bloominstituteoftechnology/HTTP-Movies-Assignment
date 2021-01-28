import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import MovieList from "./MovieList";

const initialValues = {
  id: "",
  title: "",
  director: "",
  metascore: null,
  stars: [],
};

const AddMovie = (props) => {
  const { push } = useHistory();
  const [value, setValue] = useState(initialValues);
  // const id = props.match.params.id;
  const { id } = useParams();

  const changeHandler = (ev) => {
    setValue({
      ...value,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies/", value)
      .then((res) => {
        props.setMovieList([...MovieList, res.data]);
        setValue(initialValues);
        console.log(res.data, "handleSubmit");
        push(`/`);
      })
      .catch((err) => {
        console.log(err, "post movie fail");
      });
  };

  return (
    <div className="addMovie">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="enter Title"
            value={value.title}
          />
        </label>
        <br></br>
        <label>
          Director
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="enter director"
            value={value.director}
          />
        </label>
        <br></br>
        <label>
          metascore
          <input
            type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder="enter metascore"
            value={value.metascore}
          />
        </label>
        <br></br>
        <label>
          Stars
          <input
            type="text"
            name="stars"
            onChange={changeHandler}
            placeholder="enter stars"
            value={value.stars}
          />
        </label>
        <br></br>
        <button className="button">Add</button>
      </form>
    </div>
  );
};
export default AddMovie;
