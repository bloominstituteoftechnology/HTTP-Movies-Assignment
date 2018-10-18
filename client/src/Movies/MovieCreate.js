import React, { Component } from 'react'
import axios from 'axios'

export default class MovieCreate extends Component {
  state = {
    newMovie: {
      title: '',
      director: '',
      metascore: '',
      stars: []
    }
  }

  handleChange = event => {
    if (event.target.name === 'stars') {
      this.setState({
        newMovie: {
          ...this.state.newMovie,
          stars: event.target.value.split(',')
        }
      })
    } else {
      this.setState({
        newMovie: {
          ...this.state.newMovie,
          [event.target.name]: event.target.value
        }
      })
    }
  }

  addMovie = event => {
    event.preventDefault()
    axios
      .post(`/api/movies`, this.state.newMovie)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    const { title, director, metascore, stars } = this.state
    const { handleChange, addMovie } = this

    return (
      <form
        onSubmit={addMovie}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          margin: '0 auto'
        }}
      >
        <label>Title</label>
        <input value={title} name="title" onChange={handleChange} />
        <label>Director</label>
        <input value={director} name="director" onChange={handleChange} />
        <label>Metascore</label>
        <input value={metascore} name="metascore" onChange={handleChange} />
        <label>stars</label>
        <input value={stars} name="stars" onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
    )
  }
}
