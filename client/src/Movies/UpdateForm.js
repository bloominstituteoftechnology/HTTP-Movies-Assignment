import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

const UpdateForm = (props) => {
  let history = useHistory();
  const { title, director, metascore, stars, id } = props.movie;
  const [formInputs, setFormInputs] = useState({
    title: title,
    director: director,
    metascore: metascore,
    stars: stars,
    id: id,
  });
  const handleChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formInputs)
      .then((res) => {
        setFormInputs({
          title: "",
          director: "",
          metascore: null,
          stars: [],
          id: null,
        });
        history.push("/");
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="movie-card">
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Title: </label>
        <input
          type="text"
          name="title"
          value={formInputs.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="">Director: </label>
        <input
          type="text"
          name="director"
          value={formInputs.director}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="">Metascore: </label>
        <input
          type="text"
          name="metascore"
          value={formInputs.metascore}
          onChange={handleChange}
        />
        <div className="save-button" onClick={handleSubmit}>
          Update Movie
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
