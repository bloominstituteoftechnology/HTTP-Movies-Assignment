import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateForm = (props) => {
  const initialForm = {
    id: null,
    title: "",
    director: "",
    metascore: "",
    stars: [],
  };

  const { id } = useParams();
  const [values, setValues] = useState(initialForm);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, values)
      .then((res) => console.log(res))
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
        <input
          text="type"
          name="stars"
          value={values.stars}
          onChange={handleChange}
        />
        <button
          className="edit-button"
          style={{ position: "relative", top: 20 }}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
