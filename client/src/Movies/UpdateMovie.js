import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(initialMovie);

  const changeHandler = (ev) => {
    ev.persist();
    let value = ev.target.value;
    }

    setMovie({
      ...item,
      [ev.target.name]: value
    });
  };

  const { id } = useParams();
  const{ push } = useHistory();

  useEffect(() => {
    axios
      .get(`api/movies/${id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`api/movies/${id}`, movie)
      .then((res) => {
        props.setMovies(res.data);
        push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update Movie</button>
        
      </form>
    </div>
  );
};

export default UpdateMovie;