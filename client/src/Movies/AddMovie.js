import React, { useState } from "react";
import axios from "axios";

const AddMovie = props => {
  const [add, setAdd] = useState({
    title: "",
    director: "",
    metascore: "",
    actors: ""
  });

  const handleChange = e => {
    setAdd({
      ...add,
      [e.target.name]: e.target.value
    });
    console.log(add);
  };

  const handleSubmit = e => {
    axios.post(`http://localhost:5000/api/movies/`,add)
    .then(res => {props.history.push("/")})
    .catch(err => console.log(err))
    e.preventDefault()
}

  return (
    <form onSubmit={handleSubmit}>
      <h1>{add.title}</h1>
      <p>{add.director}</p>
      <p>{add.metascore}</p>
      <p>{add.stars}</p>
      <input
        name='title'
        placeholder='Title'
        value={add.title}
        onChange={handleChange}
      />
      <input
        name='director'
        placeholder='Director'
        value={add.director}
        onChange={handleChange}
      />
      <input
        name='metascore'
        placeholder='Metascore'
        value={add.metascore}
        onChange={handleChange}
      />
      <input
        name='stars'
        placeholder='Stars'
        value={add.stars}
        onChange={handleChange}
      />
    </form>
  );
};

export default AddMovie;