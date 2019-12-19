import React, { useState, useEffect } from "react";

import axios from "axios";

const UpdateMovie = props => {
  const [updatedMovie, setUpdatedMovie] = useState({
    title: "",

    director: "",

    metascore: "",

    stars: []
  });

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/movies/${props.match.params.id}`,
        updatedMovie
      )
      .then(res => {
        setUpdatedMovie(res.data);
        props.history.push(`/`);
      })
      .catch(err => console.log(err.response));
  };
  const getMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setUpdatedMovie(res.data);
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  const handleChange = event => {
    setUpdatedMovie({
      ...updatedMovie,
      [event.target.name]: event.target.value
    });
  };

  const updateStars = (starID, event) => {
    setUpdatedMovie({
      ...updatedMovie,
      stars: updatedMovie.stars.map((star, existingID) => {
        if (existingID === starID) {
          return event.target.value;
        } else {
          return star;
        }
      })
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={updatedMovie.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={updatedMovie.director}
          onChange={handleChange}
        />
        <input
          type="number"
          name="metascore"
          placeholder="Metascore"
          value={updatedMovie.metascore}
          onChange={handleChange}
        />
        {updatedMovie.stars.map((starName, starID) => {
          return (
            <input
              type="text"
              name="stars"
              placeholder="Stars"
              value={starName}
              onChange={event => updateStars(starID, event)}
            />
          );
        })}
        <button type="submit"> Update </button>
      </form>
    </>
  );
};

export default UpdateMovie;
