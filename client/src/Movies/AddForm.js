import React, { useState } from "react";
import axios from "axios";

const initialValues = {
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const AddForm = () => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      ...formValues,
      stars: formValues.stars.split(","),
    };

    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formValues.title}
          placeholder="title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          value={formValues.director}
          placeholder="director"
          onChange={handleChange}
        />
        <input
          type="text"
          name="metascore"
          value={formValues.metascore}
          placeholder="metascore"
          onChange={handleChange}
        />
        <input
          type="text"
          name="stars"
          value={formValues.stars}
          placeholder="Stars, separate by commas"
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddForm;
