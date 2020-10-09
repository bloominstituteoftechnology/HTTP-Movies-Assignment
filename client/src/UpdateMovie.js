import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: '',
  director: '',
  metascore: 0,
};

const UpdateMovie = (props) => {

  console.log(props)
  const [updateMovie, setUpdateMovie] = useState(initialMovie);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then((res) => {
      console.log(res);
      setUpdateMovie(res.data);
    })
    .catch((err) => console.log(err));
  }, [id]);

  const handleChanges = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'metascore') {
      value = parseInt(value, 10);
    }
    setUpdateMovie({
      ...updateMovie,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
      .then((res) => {
        console.log(res);
        history.push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>Update Movie</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type='text'
          name='title'
          onChange={handleChanges}
          value={updateMovie.title}
        />
        <label htmlFor="director">Director</label>
        <input
          type='text'
          name='director'
          onChange={handleChanges}
          value={updateMovie.director}
        />
        <label htmlFor="metascore">Metascore</label>
        <input
          type='number'
          name='metascore'
          onChange={handleChanges}
          value={updateMovie.metascore}
        />
        
        <button type='submit'>Update Movie</button>
      </form>
    </>
  );
};

export default UpdateMovie;



