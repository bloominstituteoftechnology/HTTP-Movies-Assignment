import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const MovieUpdate = (props) => {
  const [movie, setMovie] = useState(initialMovie);

  const params = useParams()

  useEffect(() => {
    axios 
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err))
  }, [])

  const changeHandler = e => {
    setMovie({
      ...movie, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios 
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then(() => props.history.push('/'))
      .catch(err => console.log(err))
    console.log(movie)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="Title"
            value={movie.name}
          />
        </div>
        <div>
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="Director"
            value={movie.director}
          />
        </div>
        <div>
          <input
            type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder="Metascore"
            value={movie.metascore}
          />
        </div>
        <div>
          <input
            type="text"
            name="start"
            onChange={changeHandler}
            placeholder="Stars"
            value={movie.stars}
          />
        </div>

        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default MovieUpdate;