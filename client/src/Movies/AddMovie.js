import React, { useState } from "react";
import axios from "axios";

const AddMovie = (props) => {
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
      .then((res) => console.log(res.data))
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

export default AddMovie;
