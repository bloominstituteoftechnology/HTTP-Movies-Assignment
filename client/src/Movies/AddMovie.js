import React, { useState } from "react";
import axios from "axios";

const initialItem = {
  id: Date.now(),
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddMovie = () => {
  const [movie, setMovie] = useState(initialItem);

  const handleChange = (e) => {
    e.persist();

    setMovie({
      ...movie,
      [e.target.name]: e.target.name === "stars" ? [e.target.value.split(',')]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post('')
    console.log("post", movie);
  };

  return (
    <div>
      {/* <h1>{movie.title}</h1>
      <p>{movie.director}</p>
      <p>{movie.metascore}</p>
      <h2>Actors</h2>
      <p>{movie.stars}</p> */}

      <form onSubmit={handleSubmit}>
        <h1>Add New Movie!</h1>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="title"
          onChange={handleChange}
          value={movie.title}
        />
        <input
          type="text"
          id="director"
          name="director"
          placeholder="director"
          onChange={handleChange}
          value={movie.director}
        />
        <input
          type="number"
          id="metascore"
          name="metascore"
          placeholder="metascore"
          onChange={handleChange}
          value={movie.metascore}
        />
        <input
          type="text"
          id="stars"
          name="stars"
          placeholder="stars"
          onChange={handleChange}
          value={movie.stars}
        />
        <button>Add New Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
