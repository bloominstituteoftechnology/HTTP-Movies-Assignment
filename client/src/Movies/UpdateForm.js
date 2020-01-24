import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateForm(props) {
  const { id } = props.match.params;
  const defaultMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  };
  const [movie, setMovie] = useState(defaultMovie);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then(response => {
      console.log(response.data);
      setMovie(response.data);
    });
  }, [id]);
  console.log(id);

  const handleChange = event => {
    setMovie({ ...movie, [event.target.name]: event.target.value });
  };

  const handleStars = event => {
    setMovie({
      ...movie,
      stars: [event.target.value]
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log(movie);
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(response => {
        console.log(response);
        setMovie(defaultMovie);
        props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };
  console.log(movie);
  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="title"
          name="title"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          placeholder="director"
          name="director"
          value={movie.director}
          onChange={handleChange}
        />
        <input
          placeholder="meta score"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <input
          name="stars"
          placeholder="stars"
          value={movie.stars}
          onChange={handleStars}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
