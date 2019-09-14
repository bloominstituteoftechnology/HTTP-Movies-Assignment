import React, { useEffect, useState } from "react";
import axios from "axios";

const AddMovie = props => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: ""
  });

  useEffect(() => {

  }, []);

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      movie.title != "" &&
      movie.director != "" &&
      movie.stars != "" &&
      movie.metascore != ""
    ) {
      if (typeof movie.stars == "string") {
        const stars = movie.stars.split(",");

        const newMovie = {
          ...movie,
          stars: stars
        };

        axios
          .post(
            `http://localhost:5000/api/movies`,
            newMovie
          )
          .then(res => {
            props.history.push("/");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios
          .post(
            `http://localhost:5000/api/movies`,
            movie
          )
          .then(res => {
            props.history.push("/");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={movie.title}
        name="title"
        placeholder="Title"
      />
      <input
        onChange={handleChange}
        value={movie.director}
        name="director"
        placeholder="Director"
      />
      <input
        onChange={handleChange}
        value={movie.metascore}
        name="metascore"
        placeholder="Metascore"
      />
      <textarea
        onChange={handleChange}
        value={movie.stars}
        name="stars"
        placeholder="Stars - Seperate by commas"
      />
      <button>Add Movie</button>
    </form>
  );
};

export default AddMovie;
