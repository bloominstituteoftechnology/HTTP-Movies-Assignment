import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateMovie = (props) => {
  const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    actors: "",
  };

  const [movie, setMovie] = useState(initialMovie);

  const { id } = useParams();
  const { push } = useHistory();
  console.log(props);
  const updateMovies = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        console.log(res);
        props.setMovieList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setMovie(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log(res);
        updateMovies();
      })
      .catch((err) => {
        console.error(err);
      });
    push("/");
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="Director"
          value={movie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={handleChange}
          placeholder="Metascore"
          value={movie.metascore}
        />

        <input
          type="text"
          name="stars"
          onChange={handleChange}
          placeholder="Stars"
          value={movie.stars}
        />

        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
