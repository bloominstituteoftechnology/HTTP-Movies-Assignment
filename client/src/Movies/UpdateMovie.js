import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialState = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: [],
}


const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(initialState)
  const { id } = useParams()
  const { push } = useHistory()

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log('fetching movie data!', res)
        setMovie(res.data)
      })
      .catch(err => console.log('error fetching data', err))
    }, [id])

  const handleChanges = e => {
    setMovie({
      ...movie,
        [e.target.name]: e.target.value
      })
    }

  const handleSubmit = e => {
    e.preventDefault()
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log('submitting changes to movie', res)
        props.setMovieList(res.data)
        push('/movie-list')
      })
      .catch(err => console.log('error updating', err))
    }

  
  return (
    <div>
      <h2>Update Movie Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          onChange={handleChanges}
          placeholder='title'
          value={movie.title}
          />

        <input
          type='text'
          name='director'
          onChange={handleChanges}
          placeholder='director'
          value={movie.director}
          /> 

        <input
          type='text'
          name='metascore'
          onChange={handleChanges}
          placeholder='metascore'
          value={movie.metascore}
          />

        <button>Update</button>
      </form>
    </div>
  )
}


export default UpdateMovie;

      