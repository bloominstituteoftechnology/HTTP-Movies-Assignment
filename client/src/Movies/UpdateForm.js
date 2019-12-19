import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  id: null,
  title: "",
  director: "",
  metascore: null,
  stars: []
};

function UpdateForm({ movies, setMovies, match, history }) {
  console.log("movies", movies);
  const [movie, setMovie] = useState(initialState);

  useEffect(() => {

    const movieToEdit = movies.find(e => `${e.id}` === match.params.id);
    if (movieToEdit) setMovie(movieToEdit);
  }, [match.params.id]);

  const handleChange = e => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value

      
    });

    console.log("movie", movie);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        setMovies([...movies,res.data]);
        history.push(`/movies/${movie.id}`);
        console.log("movie put res", res);
      })
      .catch(err => console.log("err", err.response));
  };

  return (
    <div>
      <h2>Movie Update Form</h2>
      <form onSubmit={handleSubmit} className='update-form'>
        <input
          type="text"
          name="title"
          value={movie.title}
          placeholder="title"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="director"
          value={movie.director}
          placeholder="director"
          onChange={handleChange}
        />
        <input
          type="text"
          name="stars"
          value={movie.stars}
          placeholder="stars"
          onChange={handleChange}
        />
        <input
          type="number"
          name="metascore"
          value={movie.metascore}
          placeholder="metascore"
          onChange={handleChange}
        />
        <dir>
          <button type="submit" className = 'btn-update'>Update</button>
        </dir>
      </form>
    </div>
  );
}

export default UpdateForm;
