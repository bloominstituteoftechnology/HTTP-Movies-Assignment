import React, { Component } from 'react';
import axios from 'axios';



export default class MovieCreate extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      director: '',
      metascore: '',
      stars: []
    };
  }



  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
};


  submitNewMovie() {
    // fill me in with an HTTP Request to `localhost:5000/api/movies`
    axios     
        .post(`http://localhost:5000/api/movies`, this.state)
        .then(response => {
                console.log(response);
        })
        .catch(err => {
                console.log(err);
        });

        this.setState({id: '', title: '', director: '', metascore: '', stars: []});
        window.location.reload();
  };
  

  render() {
        
    return (
      <div>
      <input className='id-input'
            id="id"
            value={this.state.id}
            onChange={this.handleChange}
            placeholder='Add id...'
        />
        <input className='title-input'
            id="title"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder='Add title...'
        />
        <input className='director-input'
            id='director'
            value={this.state.director}
            onChange={this.handleChange}
            placeholder='Add director...'
        />
        <input className='metascore-input'
            id='metascore'
            value={this.state.metascore}
            onChange={this.handleChange}
            placeholder='Add metascore...'
        />
        <input className='stars-input'
            id='stars'
            value={this.state.stars}
            onChange={this.handleChange}
            placeholder='Add Stars...'
        />
        <button onClick={this.submitNewMovie}>Submit New Movie</button>
      </div>
    );
  }
}


