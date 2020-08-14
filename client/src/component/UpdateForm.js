import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const UpdateMovie = () => {
  const { push } = useHistory();

  const { id } = useParams();

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  const handleSubmit = (e) => {
    axios.put(`http://localhost:5000/api/movies/${id}`, movie);
    push(`/movies/${movie.id}`);
  };

  const handleChange = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "stars") {
      value = value.split(",");
    }
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then((res) => {
      setMovie(res.data);
    });
  }, [id]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={movie.title}
        />
        <br />
        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={handleChange}
          value={movie.director}
        />
        <br />
        <input
          type="text"
          name="metascore"
          placeholder="Metascore"
          onChange={handleChange}
          value={movie.metascore}
        />
        <br />
        <input
          type="text"
          name="stars"
          placeholder="Actors"  
          onChange={handleChange}
          value={movie.stars}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default UpdateMovie