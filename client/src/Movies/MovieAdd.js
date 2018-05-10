import React, { Component } from 'react';
import axios from 'axios';

export default class MovieAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieTitle: '',
      director: '',
      metascore: '',
      stars: '',
      starsArr: [],
    }
  }

  // setInputVal
  setInputVal = e => {
    this.setState({ [ e.target.name ]: e.target.value });
  }

  // submitNewMovie
  submitNewMovie = e => {
    e.preventDefault();

    // `this.state.stars` is a string of comma delimitted values
    // this needs to be split and trimmed in order to be properly sent to the DB
    const starsStringSplit = this.state.stars.split(',');

    for (let i = 0; i < starsStringSplit.length; i++) {
      starsStringSplit[i] = starsStringSplit[i].trim();
    }
    
    // send data to server
    axios.post('http://localhost:5000/api/movies', {
      title: this.state.movieTitle,
      director: this.state.director,
      metascore: +this.state.metascore,
      stars: [ ...starsStringSplit ],
    })
      .then(({ data }) => {
        // routes user to home page
        this.props.history.push('/');
      })
      .catch(err => console.log('ERR', err));
  }

  // render
  render() {
    console.log(this.props)
    return (
      <div className='movie-form-wrapper'>
        <form>

          {/* Movie Title */}
          <input
            name='movieTitle'
            onChange={ this.setInputVal }
            placeholder='Movie Title'
            type='text'
            value={ this.state.movieTitle }
          />

          {/* Director */}
          <input
            name='director'
            onChange={ this.setInputVal }
            placeholder='Director'
            type='text'
            value={ this.state.director }
          />

          {/* Metascore */}
          <input
            name='metascore'
            onChange={ this.setInputVal }
            placeholder='Metascore'
            type='text'
            value={ this.state.metascore }
          />

          {/* Stars */}
          <input
            name='stars'
            onChange={ this.setInputVal }
            placeholder='Starring'
            type='text'
            value={ this.state.stars }
          />

          {/* Submit */}
          <input
            type='submit'
            onClick={ this.submitNewMovie }
            value='Submit New Movie'
          />

        </form>
      </div>
    )
  }
}