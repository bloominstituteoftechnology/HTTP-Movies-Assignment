import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMovie = props => {
  const [movie, setMovie] = useState({
    // id: "null",
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error);
  }, [props.match.params.id]);

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: [e.target.value]
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
      .then(res => {
        setMovie({
          // id: "null",
          title: "",
          director: "",
          metascore: "",
          stars: []
        });
        props.history.push("/");
      })
      .catch(err => console.error);
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
        />
        <label htmlFor="director">Director</label>
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
        />
        <label htmlFor="metascore">Metascore</label>
        <input
          type="number"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <label htmlFor="stars">Starring</label>
        <input
          type="text"
          name="stars"
          value={movie.stars}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
