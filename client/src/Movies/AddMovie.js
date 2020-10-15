import React, { useState } from 'react';
import axios from 'axios';

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
};

const AddMovie = props => {
  const [movie, setMovie] = useState(initialMovie);

    setMovie({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`api/movies/${id}`, movie)
      .then((res) => {
        props.setMovies(res.data);
        push(`/movies/`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div />

        <button className="add-movie-button">Add Movie</button>

      </form>
    </div>
  );
};


export default AddMovie;