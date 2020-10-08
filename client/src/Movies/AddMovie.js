import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddMovie = (props) => {
  const history = useHistory();

  const startingForm = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
  };

  const [newMovie, setNewMovie] = useState(startingForm);

  const handleChange = (e) => {
    e.persist();
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    const movieWithStarsArray = {
      ...newMovie,
      stars: newMovie.stars.split(", "),
    };

    console.log("STARS ARRAY: ", movieWithStarsArray);

    axios
      .post("http://localhost:5000/api/movies", movieWithStarsArray)
      .then((res) => {
        console.log("RES: ", res.data);
        setNewMovie(res.data);
      });
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          htmlFor="title"
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          value={newMovie.name}
          onChange={handleChange}
        />

        <input
          htmlFor="director"
          id="director"
          name="director"
          type="text"
          placeholder="Director"
          value={newMovie.director}
          onChange={handleChange}
        />

        <input
          htmlFor="metascore"
          id="metascore"
          name="metascore"
          type="number"
          placeholder="Metascore"
          value={newMovie.metascore}
          onChange={handleChange}
        />

        <input
          htmlFor="stars"
          id="stars"
          name="stars"
          type="string"
          placeholder="Stars"
          value={newMovie.stars}
          onChange={handleChange}
        />

        <button type="submit">Add a new movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
