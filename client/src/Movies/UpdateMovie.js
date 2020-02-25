import React, { useState } from "react";
import axios from "axios";

const UpdateMovie = props => {
  const [movie, setMovie] = useState({ id: props.match.params.id });
  // console.log(props.match.param.id)

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const movieFormat = {
      ...movie,
      stars: movie.stars.split(", ")
    };

    axios
    
      .put(
        `http://localhost:5000/api/movies/${props.match.params.id}`,
        movieFormat
      )
      .then(res => {
        document.querySelector("form").reset();
        props.history.push("/");
      })
      .catch();
  };
  return (
    <div>
      <h1>Editor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
        />
        <br />
        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="Director"
        />
        <br />
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          placeholder="Score"
        />
        <br />
        <input
          type="text"
          name="stars"
          onChange={handleChange}
          placeholder="Stars"
        />
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
