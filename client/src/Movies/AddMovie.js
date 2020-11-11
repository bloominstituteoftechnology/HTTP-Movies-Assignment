import React, { useState } from "react";
import axios from "axios";

const initialValues = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const AddMovie = () => {
    const [formValues, setFormValues] = useState(initialValues);
  
    const handleChange = (e) => {
      e.preventDefault();
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
        <form className="addMovie" onSubmit={handleSubmit}>
  
          <input
            type="text"
            name="title"
            value={formValues.title}
            placeholder="Title"
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
            type="text"
            name="metascore"
            placeholder="Metascore"
            value={formValues.metascore}
            onChange={handleChange}
          />
  
  
          <input
            type="text"
            name="stars"
            placeholder="List stars here using commas"
            value={formValues.stars}
            onChange={handleChange}
          />
  
  
          <button>Submit</button>
  
        </form>
      </div>
    );
  };
  
  export default AddMovie;