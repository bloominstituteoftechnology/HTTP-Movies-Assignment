import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialItem = {
  id: Date.now(),
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const AddMovie = () => {
  const history = useHistory();
  const [movie, setMovie] = useState(initialItem);

  const handleChange = (e) => {
    e.persist();

    setMovie({
      ...movie,
      [e.target.name]:
        e.target.name === "stars"
          ? e.target.value.split(",")
          : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("post", movie);
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        history.push("/");
      });
  };

  return (
    <div>
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
