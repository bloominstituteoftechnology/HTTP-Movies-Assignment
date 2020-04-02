import React, { useState, useEffect } from "react";
import axios from "axios";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovieForm = props => {
  const [updateMovie, setUpdateMovie] = useState(initialItem);

  useEffect(() => {
    const editingMovie = props.movies.find(film => {
      return film.id === Number(props.match.params.id);
    });

    console.log("The Movie", editingMovie);
    if (editingMovie) {
      setUpdateMovie(editingMovie);
    }
  }, [props.movies, props.match.params]);

  const changeHandler = e => {
    e.preventDefault();

    setUpdateMovie({ ...updateMovie, [e.target.name]: e.target.value });
  };

  const submitHandler = (e, id) => {
    e.preventDefault();

    // axios
    //   .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  };

  return (
    <div className="update-form">
      <h2>Update Movie</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={changeHandler}
          value={updateMovie.title}
        />
        <br />
        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={changeHandler}
          value={updateMovie.director}
        />
        <br />
        <input
          type="text"
          name="metascore"
          placeholder="Metascore"
          onChange={changeHandler}
          value={updateMovie.metascore}
        />
        <br />
        <input
          type="text"
          name="stars"
          placeholder="Stars"
          onChange={changeHandler}
          value={updateMovie.stars}
        />
        <br />
      </form>
      <button type="submit">Update Movie</button>
    </div>
  );
};

export default UpdateMovieForm;
