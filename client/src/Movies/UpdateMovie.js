import React, { useState, useEffect } from "react";
import axios from "axios";

const initialItem = {
  title: "",
  director: "",
  metascore: 0,
  stars: []
};
const UpdateFilm = props => {
  const [film, setFilm] = useState(initialItem);
  useEffect(() => {
    const itemToEdit = {};
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(response => {
        console.log(response);
        setFilm(response.data);
      })
      .catch(err => console.log(err.response));
  }, []);
  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setFilm({
      ...film,
      [e.target.name]: value
    });
  };
  const changeActor = e => {
    const newStars = [...film.stars];
    newStars[0] = e.target.value;
    setFilm({
      ...film,
      stars: newStars
    });
  };
  const changeActor2 = e => {
    e.persist();
    console.log("e.target", e.target);
    const newStars = [...film.stars];
    newStars[1] = e.target.value;
    setFilm({
      ...film,
      stars: newStars
    });
  };
  const changeActor3 = e => {
    e.persist();
    const newStars = [...film.stars];
    newStars[2] = e.target.value;
    setFilm({
      ...film,
      stars: newStars
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, film)
      .then(response => {
        props.history.push("/");
      })
      .catch(err => console.log(err.response));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Update Movie</h2>
        <label>
          Movie Title:
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="title"
            value={film.title}
          />
        </label>
        <label>
          Director:
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="director"
            value={film.director}
          />
        </label>
        <label>
          Metascore:
          <input
            type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder="metascore"
            value={film.metascore}
          />
        </label>
        <label>Stars:</label>
        <input
          changeStar={0}
          type="text"
          name="actor1"
          onChange={changeActor}
          placeholder="actor1"
          value={film.stars[0]}
        />
        <input
          changeStar={1}
          type="text"
          name="actor2"
          onChange={changeActor2}
          placeholder="actor1"
          value={film.stars[1]}
        />
        <input
          changeStar={2}
          type="text"
          name="actor3"
          onChange={changeActor3}
          placeholder="actor1"
          value={film.stars[2]}
        />
        <button>Update Movie</button>
      </form>
    </div>
  );
};
export default UpdateFilm;
