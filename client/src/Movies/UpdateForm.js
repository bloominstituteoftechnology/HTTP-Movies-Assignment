import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: []
}

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie)
  const { id } = useParams();

  useEffect(() => {
    const movieToUpdate = props.savedList.find( movie => `${movie.id}` === id)
    if(movieToUpdate){
      setMovie(movieToUpdate)
    }
  }, [props.savedList, id])

  const handleSubmit = e => {
    e.preventDefault()

    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log(res);
        props.savedList([res.data]);
        props.history.push(`/movies`);
        setMovie(initialMovie);
      })
      .catch(err => {
        console.log(err);
        props.history.push('/');
      })
  }

  const handleChanges = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChanges}
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={handleChanges}
          value={movie.director}
        />
        <input
          type="text"
          name="metascore"
          placeholder="Score"
          onChange={handleChanges}
          value={movie.metascore}
        />
        <input
          type="text"
          name="stars"
          placeholder="Stars separated by commas ( , )"
          onChange={handleChanges}
          value={movie.stars}
        />
        <button>Update</button>
      </form>
    </div>
  )
}

export default UpdateMovie;