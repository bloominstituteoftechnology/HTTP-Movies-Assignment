import React, {useState} from "react";
import { useHistory } from "react-router";
import axios from "axios";

const initialMovie = {
  title: '',
  director: '',
  metascore: 0
};

const AddMovie = (props) => {
  const [newMovie, setNewMovie] = useState(initialMovie);
  const push = useHistory();
  
  const handleChanges = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'metascore') {
      value = parseInt(value, 10);
    }
    setNewMovie({
      ...newMovie,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, newMovie)
      .then((res) => {
        console.log(res);
        props.setMovieList(res.data);
        push("/")
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>Add Movie</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type='text'
          name='title'
          onChange={handleChanges}
          value={newMovie.title}
        />
        <label htmlFor="director">Director</label>
        <input
          type='text'
          name='director'
          onChange={handleChanges}
          value={newMovie.director}
        />
        <label htmlFor="metascore">Metascore</label>
        <input
          type='number'
          name='metascore'
          onChange={handleChanges}
          value={newMovie.metascore}
        />
        <button type='submit'>Add Movie</button>
      </form>
    </>
  );
};

export default AddMovie;