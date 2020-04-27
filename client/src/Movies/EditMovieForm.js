import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const iniitialState = {
  id: 0,
  title: "",
  director: "",
  metascore: 0,
  stars: [],
};

const EditMovieForm = (props) => {
  const [movie, setMovie] = useState(iniitialState);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }, []);

  const changeHandler = (e) => {
    // e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value);
    }

    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const movie = currentMovie;
    console.log({ movie });
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        axios
          .get(`http://localhost:5000/api/movies`)
          .then((res) => props.setMovieList(res.data));
        push(`/`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form>
      <label htmlFor="title">
        Title:
        <input
          value={movie.title}
          onChange={changeHandler}
          name="title"
          type="text"
        />
      </label>
      <label htmlFor="director">
        Director:
        <input
          value={movie.director}
          onChange={changeHandler}
          name="director"
          type="text"
        />
      </label>
      <label htmlFor="metascore">
        MetaScore:
        <input
          value={movie.metascore}
          onChange={changeHandler}
          name="metascore"
          type="text"
        />
      </label>
      <button
        onClick={(e) => {
          handleSubmit(e);
        }}
        className="submit-btn"
      >
        Submit
      </button>
    </form>
  );
};

export default EditMovieForm;
