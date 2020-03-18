import React, {useEffect, useState} from "react";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import axios from 'axios';


const UpdateMovie = (props) => {
  const [newMovie, setNewMovie] = useState('');
  console.log("update props:", props);
  let id = props.match.params.id;
  // useEffect(() =>{
  //   const editMovie = props.movies
  // })


  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;


    setNewMovie({
      ...newMovie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let movie = {id: id, title:newMovie.title, director:newMovie.director, metascore: newMovie.metascore, stars:props.movies.stars};
    console.log("submitted!");
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
          console.log(res);

          props.history.push(`/`);
      })
      .catch(err => {
          console.log(err);
      });
  };

  return (
    <div className="movie-card">

      <form onSubmit={handleSubmit}>
        Title:{' '}
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder={props.movies.title}
          value={newMovie.title}
        />
        <div className="baseline" />
        <br />
        Director:{' '}
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder={props.movies.director}
          value={newMovie.director}
        />
        <div className="baseline" />
        <br />
        Metascore:{' '}
        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder= {props.movies.metascore}
          value={newMovie.metascore}
        />
        <div className="baseline" />
        <br />
        <br />

        {props.movies.stars.map(star => (
          <div key={star} className="movie-star">
            Actor:{star}


          </div>
        ))}

        <button className="md-button form-button">Update Movie</button>
      </form>
    </div>
  );
};

  export default UpdateMovie;