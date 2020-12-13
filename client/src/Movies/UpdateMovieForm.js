import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
// import e from "express";

const initialValues = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [""],
};

const UpdateMovieForm = (props) => {
  const { push } = useHistory();
  const { id } = useParams();
  const [movieValues, setMovieValues] = useState(initialValues);

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setMovieValues({ ...movieValues, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    movieValues.stars = movieValues.stars.split(",");
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieValues)
      .then(() => {
        setMovieValues(initialValues);
        props.getMovieList();
        push("/");
        props.setRefresh(true);
      })
      .catch((err) => {
        console.log(err.message, "error");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        res.data.stars = res.data.stars.join(",");
        setMovieValues(res.data);
      })
      .catch(
        (err) => {
          console.log(err.message, "error useEffect");
        },
        [id]
      );
  });

  return (
    <div>
      <h3>Update Item</h3>
      <form onSubmit={onSubmit}>
        <label> Movie Title: </label>
        <input
          type="text"
          name="title"
          onChange={onChange}
          placeholder="placerholder"
          value={movieValues.title}
        />
        <label> Movie Director: </label>
        <input
          type="text"
          name="director"
          onChange={onChange}
          placeholder="Director"
          value={movieValues.director}
        />
        <label> Metascore: </label>
        <input
          type="text"
          name="metascore"
          onChange={onChange}
          placeholder="Metascore"
          value={movieValues.metascore}
        />
        <label> Stars: </label>
        <input
          type="text"
          name="stars"
          onChange={onChange}
          placeholder="Stars"
          value={movieValues.stars}
        />
        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
