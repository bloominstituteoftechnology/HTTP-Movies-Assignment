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
    axios
      .post(`http://localhost:5000/api/movies/`, add)
      .then(res => {
        props.history.push("/");
      })
      .catch(err => console.log(err));
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='title'>Add Movie Info</h1>
      <div className='addMovie'>
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
        <button>Submit</button>
      </div>
      <h1 className='title'>Card Preview</h1>
      <div className='cardPreview'>
        <h1>Title:{add.title}</h1>
        <p>Director:{add.director}</p>
        <p>Metascore:{add.metascore}</p>
        <p>Actors:{add.stars}</p>
      </div>
    </form>
  );
};

export default AddMovie;
