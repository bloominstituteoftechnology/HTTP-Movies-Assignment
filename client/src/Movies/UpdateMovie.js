import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useRouteMatch } from "react-router-dom";

function UpdateMovie({ movies, getMovies }) {
  const [mov, setMov] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });
  const match = useRouteMatch();
  const history = useHistory();
  const changeHandler = e => {
    setMov({
      ...mov,
      [e.target.name]: e.target.value,
    });
  };
  const updatingMovie = e => {
    e.preventDefault();
    mov.metascore = mov.metascore * 1;
    mov.stars = mov.stars.split(",");

    const id = match.params.id;
    axios
      .put(`http://localhost:5000/api/movies/${id}`, mov)
      .then(() => {
        getMovies(movies);
        history.push(`/`);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    const id = match.params.id;
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        res.data = {
          ...res.data,
          stars: res.data.stars.toString(),
        };
        setMov(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [match.params.id]);

  return (
    <section className="update-form">
      <form onSubmit={updatingMovie}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="string"
          value={mov.title}
          onChange={changeHandler}
        />
        <br />
        <label>Director</label>
        <input
          name="director"
          type="string"
          value={mov.director}
          onChange={changeHandler}
        />
        <br />
        <label>Metascore</label>
        <input
          name="metascore"
          type="number"
          value={mov.metascore}
          onChange={changeHandler}
        />
        <br />
        <label>Stars</label>
        <input
          name="stars"
          type="string"
          value={mov.stars}
          onChange={changeHandler}
        />
        <br />
        <button>Update</button>
      </form>
    </section>
  );
}

export default UpdateMovie;