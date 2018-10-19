import React from 'react';
import { Redirect } from 'react-router-dom';

class AddMovieForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      director: '',
      metascore: '',
      stars: [],
      // redirect: false,
    }
  }

  handleAddSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.director && this.state.metascore && this.state.stars) {
      let starList = Array.from(this.state.stars.split(','))
      this.props.addMovie(this.state.title, this.state.director, this.state.metascore, starList);
      this.setState({
        title: '',
        director: '',
        metascore: '',
        stars: [],

      })
      // this.props.history.push('/');
    } else {
      alert('All fields must be filled out');
    }

  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render(){
    // if (this.state.redirect) {
    //   return (
    //     <Redirect to='/' />
    //   )
    // }
    return(
    <div className='add-movie-form'>
    <h1>Add a movie</h1>
    <form onSubmit={this.handleAddSubmit}>
        <label>
            Title:
          <input
            type='text'
            name='title'
            id='title'
            placeholder='title'
            value={this.state.title}
            onChange={this.handleInput}
          />
        </label>
        <label>
            Director:
          <input
            type='text'
            name='director'
            id='director'
            placeholder='director'
            value={this.state.director}
            onChange={this.handleInput}
          />
        </label>
        <label>
          MetaScore:
          <input
            type='number'
            name='metascore'
            id='metascore'
            placeholder="metascore"
            value={this.state.metascore}
            onChange={this.handleInput}
          />
      </label>
      <label>
        The movie stars (separate with commas, please):
          <input
            type='text'
            name='stars'
            id='stars'
            placeholder='starring'
            value={this.state.stars}
            onChange={this.handleInput}
          />
        </label>
        <button type='submit'>Add it!</button>
      </form>
    </div>
  )
  }
}

export default AddMovieForm;
