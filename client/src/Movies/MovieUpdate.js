import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const MovieUpdate = props => {
  const [movie, setMovie] = useState(initialMovie);
 
  useEffect(() => {
    const movieToUpdate = props.items.find(thing => `${thing.id}` === id);

    if (movieToUpdate) {
      setItem(movieToUpdate);
    }
  }, [props.items, id]);

  const handleChange= e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'stars') {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        
        props.setMovie(res.data);
        props.history.push(`/movies/${movie.id}`);
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
          onChange={handleChange}
          placeholder="Title"
          value={movie.title}
        />
        
        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="Director"
          value={movie.director}
        />
        
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          placeholder="MetaScore"
          value={movie.metascore}
        />
        
        <input
          type="text"
          name="stars"
          onChange={handleChange}
          placeholder="Stars"
          value={movie.stars}
        />
        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default MovieUpdate;
