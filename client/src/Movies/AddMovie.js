import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const initialState = {
  id: Date.now(),
  title: '',
  director: '',
  metascore: '',
  stars: ['Daniel Vazquez', 'Webpt24'],
}

const AddMovie = (props) => {
  const [newMovie, setNewMovie] = useState(initialState)
  const { push } = useHistory()

  const handleChanges = e => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/movies/', newMovie)
      .then(res => {
        console.log('added new movie to list!', res)
        props.setMovieList(res.data)
        push('/')
      })
      .catch(err => console.log('error adding new movie', err))
    }

    return (
      <div>
        <h2>Add New Movie</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='title'
            onChange={handleChanges}
            placeholder='title'
            value={newMovie.title}
            />
  
          <input
            type='text'
            name='director'
            onChange={handleChanges}
            placeholder='director'
            value={newMovie.director}
            /> 
  
          <input
            type='text'
            name='metascore'
            onChange={handleChanges}
            placeholder='metascore'
            value={newMovie.metascore}
            />

          <input
            type='text'
            name='stars'
            onChange={handleChanges}
            value={newMovie.stars}
            />
  
          <button>Add</button>
        </form>
      </div>
    )
  }
  
  
  export default AddMovie;