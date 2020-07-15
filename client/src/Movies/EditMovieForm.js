import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import StarsForm from './StarsForm';

const iniitialState = {
  id: 0,
  title: '',
  director: '',
  metascore: 0,
  stars: [],
};

const EditMovieForm = props => {
  const [movie, setMovie] = useState(iniitialState);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err));
  }, []);

  const changeHandler = e => {
    // e.persist();
    let value = e.target.value;
    if (e.target.name === 'metascore') {
      value = parseInt(value);
    }

    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  const starsChangeHandler = (e, i) => {
    e.persist();

    let actors = [...movie.stars];

    actors[i] = e.target.value;
    console.log(actors[i]);

    setMovie({ ...movie, stars: [...actors] });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // const movie = currentMovie;

    console.log({ movie });
    axios
      .put(`http://localhost:7000/api/movies/${id}`, movie)
      .then(res => {
        axios
          .get(`http://localhost:7000/api/movies`)
          .then(res => props.setMovieList(res.data));
        push(`/`);
      })
      .catch(err => console.log(err));
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
      <div className="start">
        <h2>Stars</h2>
        {movie.stars.map((star, i) => {
          return (
            <input
              type="text"
              name={star}
              value={star}
              onChange={e => starsChangeHandler(e, i)}
            />
          );
        })}
      </div>
      <button
        onClick={e => {
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
