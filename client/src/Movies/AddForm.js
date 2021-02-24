import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";

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
  const { push } = useHistory();

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
        props.setMovieList(res.data);
        setValues(initialForm);
        push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "stars") {
      setValues({
        ...values,
        stars: value.split(","),
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="inner-form">
        <label>
          title
          <input
            text="type"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </label>
        <label>
          director
          <input
            text="type"
            name="director"
            value={values.director}
            onChange={handleChange}
          />
        </label>
        <label>
          metascore
          <input
            text="type"
            name="metascore"
            value={values.metascore}
            onChange={handleChange}
          />
        </label>
        <label>
          stars
          <input
            text="type"
            name="stars"
            value={values.stars}
            onChange={handleChange}
          />
        </label>
        <p>* separate stars by a comma</p>
        <button style={{ margin: "0 auto" }}>Add Movie</button>
      </div>
    </form>
  );
};

export default AddForm;
