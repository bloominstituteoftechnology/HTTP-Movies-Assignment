import React, { Component } from 'react';
import axios from 'axios';

import './Movie.css';

class MovieCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      title: '',
      director: '',
      metascore: ''
    };
  }

  addMovie = movie => {
    axios
      .post('http://localhost:5000/api/movies', movie)
      .then(res => {
        console.log(res.data);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  handleSubmit = e => {
    e.preventDefault();
    let movie = {
      title: this.state.title,
      director: this.state.director,
      metascore: this.state.metascore,
      stars: this.handleStars(this.state.stars)
    };
    this.addMovie(movie);
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleStars = starStr => {
    return starStr.split(',');
  };
  //the inputs on this form could easily be separated into another component to make it more dry
  //if I were to do it, I would pass in the event handlers as they are, and then a name prop to
  //keep 'e.target.name' working. Everything is the same, except for the name
  //I would also create a stars component and just push data to a stars array, passing down the handler
  render() {
    console.log(this.props);
    return (
      <div className="create-container">
        <form className="create-movie" onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            onChange={this.handleInputChange}
            name="title"
            type="text"
            placeholder="title"
            value={this.state.title}
          />
          <label>Director</label>
          <input
            onChange={this.handleInputChange}
            name="director"
            placeholder="name"
            type="text"
            value={this.state.director}
          />
          <label>Metascore</label>
          <input
            onChange={this.handleInputChange}
            name="metascore"
            type="text"
            placeholder="metascore"
            value={this.state.metascore}
          />
          <label>Stars</label>
          <textarea
            name="stars"
            onChange={this.handleInputChange}
            value={this.state.stars}
            placeholder="Names separated by a 'comma'"
            cols="30"
            rows="10"
          />
          <button>Submit Movie</button>
        </form>
      </div>
    );
  }
}
// id: 0,
// title: 'The Godfather',
// director: 'Francis Ford Coppola',
// metascore: 100,
// stars: ['Marlon Brando', 'Al Pacino', 'Robert Duvall']

export default MovieCreate;
