/* jshint esversion: 9 */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: " ",
  director: " ",
  metascore: " ",
  stars: " "
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();

  // const editedMovie = props.match.params.id;
  // const movieToUpdate = props.movies.find(thing => `${thing.id}` === id);
  useEffect(() => {
    console.log(props.movies);
    const movieToUpdate = props.movies.find(thing => `${thing.id}` === id);
    console.log(movieToUpdate);
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movies, id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        // res.data is the FULL array with the updated item
        // That's not always the case. Sometimes you need to build your
        // own updated array
        const newList = props.movies.map(item => {
          if (item.id === movie.id) {
            return (item = res.data);
          } else {
            return item;
          }
        });
        props.setMovies(newList);

        props.history.push(`/`);
      })
      .catch(err => console.log(err));
  };

  //delete
  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        const newListTwo = props.movies.map(item => {
          if (item.id === movie.id) {
            return (item = res.data);
          } else {
            return item;
          }
        });
        props.setMovies(newListTwo);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
        <button onClick={handleDelete} className="md-button form-button">
          Delete
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
