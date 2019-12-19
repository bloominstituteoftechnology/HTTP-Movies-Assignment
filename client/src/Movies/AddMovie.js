import React, { useState } from "react";
import axios from "axios";

const newMovie = {
  id: Date.now(),
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const AddMovie = props => {
  const [movieData, setMovieData] = useState(newMovie);

  const handleInputChanges = e => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    console.log(movieData)
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", movieData)
      .then(res => {
        setMovieData(res.data);
        props.history.push(`/`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleInputChanges}
          value={movieData.title}
        />

        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={handleInputChanges}
          value={movieData.director}
        />

        <input
          type="text"
          name="metascore"
          placeholder="Metascore"
          onChange={handleInputChanges}
          value={movieData.metascore}
        />

        <input
          type="text"
          name="stars"
          placeholder="Stars"
          onChange={handleInputChanges}
          value={movieData.stars}
        />

        <button>Add New Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
