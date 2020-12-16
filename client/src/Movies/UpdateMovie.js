import React, { useState } from "react";
import axios from "axios";

const initialFormValues = {
  // id: null,
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleFormChange = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/:id`) //make id template literals
      .then((res) => {
        console.log("res: ", res);
        //now set state to updated list and push history to /movies/id
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <div>
      <div>
        <h3>Edit Movie</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              value={formValues.title}
              placeholder="title"
              onChange={handleFormChange}
            />
          </label>
          <label>
            Director
            <input
              type="text"
              name="director"
              value={formValues.director}
              placeholder="director"
              onChange={handleFormChange}
            />
          </label>
          <label>
            <input
              type="text"
              name="metascore"
              value={formValues.metascore}
              placeholder="metascore"
              onChange={handleFormChange}
            />
          </label>
          <label>
            <input
              type="text"
              name="stars"
              value={formValues.stars}
              placeholder="stars"
              onChange={handleFormChange}
            />
          </label>
          <button>Submit Changes</button>
        </form>
      </div>
    </div>
  );
};
export default UpdateMovie;
