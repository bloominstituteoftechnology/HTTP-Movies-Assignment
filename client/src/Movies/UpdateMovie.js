import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  title: '', 
director: '',
}

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);

 



  

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
    .then(res =>{
      props.updateMovies(res.data)
      props.history.push(`/movie-list/${movie.id}`);
      setMovie(initialMovie);
    })
    .catch(err => console.log(err.response));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
       
          placeholder="Title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
         
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="numbere"
          name="metascore"
        
          placeholder="Metascore"
          value={movie.metascorel}
        />
        <div className="baseline" />

        <input
          type="string"
          name="description"
      
          placeholder="Description"
          value={movie.description}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
         
          placeholder="stars"
          value={movie.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
  }

export default UpdateMovie;

  
  