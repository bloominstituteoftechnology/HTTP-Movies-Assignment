import React, { Component } from 'react'
import axios from 'axios'

export default class MovieCreate extends Component {
  state = {
    newMovie: {
      title: '',
      director: '',
      metascore: '',
      stars: ''
    }
  }

  handleChange = event => {
    this.setState({
      newMovie: {
        ...this.state.newMovie,
        [event.target.name]: event.target.value
      }
    })
  }

  addMovie = () => {
    axios
      .post(`/api/movies`, this.state.newMovie)
      .then(res => console.log(res))
      .cathc(err => console.log(err))
  }

  render() {
    const { title, director, metascore, stars } = this.state
    const { handleChange, addMovie } = this

    return (
      <form>
        <label>Title</label>
        <input value={title} name="title" onChange={handleChange} />
        <label>Director</label>
        <input value={director} name="director" onChange={handleChange} />
        <label>Metascore</label>
        <input value={metascore} name="metascore" onChange={handleChange} />
        <label>stars</label>
        <input value={stars} name="stars" onChange={handleChange} />
      </form>
    )
  }
}
