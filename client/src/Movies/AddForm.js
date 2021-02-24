import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const AddForm = (props) => {
  const initialForm = {
    id: null,
    title: "",
    director: "",
    metascore: "",
    stars: [],
  };

  const { id } = useParams();
  const [values, setValues] = useState(initialForm);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, values)
      .then((res) => {
        const updatedMovieList = props.movieList.map((movie) => {
          if (movie.id === res.data.id) {
            return res.data;
          }
          return movie;
        });
        props.setMovieList(updatedMovieList);
        setValues(initialForm);
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="inner-form">
        <input
          text="type"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        <input
          text="type"
          name="director"
          value={values.director}
          onChange={handleChange}
        />
        <input
          text="type"
          name="metascore"
          value={values.metascore}
          onChange={handleChange}
        />
        <input text="type" name="stars" value={values.stars} />
      </div>
    </form>
  );
};

export default AddForm;
