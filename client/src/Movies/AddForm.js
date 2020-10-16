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
    setFormValues(initialValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formValues.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={formValues.director}
          onChange={handleChange}
        />
        <input
          type="number"
          name="metascore"
          placeholder="Metascore"
          value={formValues.metascore}
          onChange={handleChange}
        />
        <input
          type="text"
          name="stars"
          placeholder="Stars, separate by commas"
          value={formValues.stars}
          onChange={handleChange}
        />
        <button>Add Movie</button>
      </form>
    </div>
  );
};

export default AddForm;
