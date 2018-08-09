import React from 'react';
import axios from 'axios';

class MovieForm extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
      director: '',
      metascore: '',
      starone: '',
      startwo: '',
      starthree: '',
    };
  }

  handleInputChange = event =>{
    this.setState({[event.target.name]: event.target.value});
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const newStars = [this.state.starone, this.state.startwo, this.state.starthree];
    const newMovie = {
      title: this.state.title,
      director: this.state.director,
      metascore: parseInt(this.state.metascore, 10),
      stars: newStars
    };
    axios.post('http://localhost:5000/api/movies', newMovie)
          .then(res => this.props.history.push('/'))
          .catch(err => console.log(err));
  }

  render(){
    return(
      <form onSubmit={this.handleFormSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={this.state.title}
          placeholder="Enter Movie Title"
          onChange={this.handleInputChange}
        />
        <label htmlFor="director">Director:</label>
        <input
          type="text"
          name="director"
          id="director"
          value={this.state.director}
          placeholder="Enter Movie Director"
          onChange={this.handleInputChange}
        />
        <label htmlFor="metascore">Metascore:</label>
        <input
          type="number"
          name="metascore"
          id="metascore"
          value={this.state.metascore}
          placeholder="Enter Movie Metascore"
          onChange={this.handleInputChange}
        />
        <label htmlFor="starone">First Star:</label>
        <input
          type="text"
          name="starone"
          id="starone"
          value={this.state.starone}
          placeholder="Enter First Movie Star"
          onChange={this.handleInputChange}
        />
        <label htmlFor="startwo">Second Star:</label>
        <input
          type="text"
          name="startwo"
          id="startwo"
          value={this.state.startwo}
          placeholder="Enter Second Movie Star"
          onChange={this.handleInputChange}
        />
        <label htmlFor="starthree">Third Star:</label>
        <input
          type="text"
          name="starthree"
          id="starthree"
          value={this.state.starthree}
          placeholder="Enter Third Movie Star"
          onChange={this.handleInputChange}
        />
        <button type="submit">Submit!</button>
      </form>
    );
  }
}

export default MovieForm;
