import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialItem = {
  title: '',
  director: '',
  metascore: '',
  actors: ''
};

const UpdateForm = props => {
  const [item, setItem] = useState(initialItem);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        console.log(res.data);
        setItem(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    e.preventDefault();
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, item)
      .then(res => {
        props.setItem(res.data);
        props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type='text'
            placeholder='Title:'
            name='title'
            onChange={handleChange}
            value={item.title}
          />
        </label>
        <label>
          Director:
          <input
            type='text'
            placeholder='Director:'
            name='director'
            onChange={handleChange}
            value={item.director}
          />
        </label>
        <label>
          Metascore:
          <input
            type='text'
            placeholder='Metascore:'
            name='metascore'
            onChange={handleChange}
            value={item.metascore}
          />
        </label>
        <label>
          Actors
          <input
            type='text'
            placeholder='Actors'
            name='actors'
            onChange={handleChange}
            value={item.actors}
          />
        </label>
        <button>Edit</button>
      </form>
    </div>
  );
};

export default UpdateForm;
