  
import React from 'react';
import axios from 'axios';

const emptyForm = { title: '', director: '', metascore: '', stars: ['', '', ''] }

class AddForm extends React.Component {
  state = {
    movie: emptyForm
  }

  handleChange = e => {
    this.setState({
      movie: {
        ...this.state.movie,
        [e.target.name]: e.target.value
      }
    })
  }

  handleStars = (e) => {
    const newStars = this.state.movie.stars.map((star, index) => {
      if (`${index}` === e.target.name) return e.target.value;
      else return star;
    })
    console.log(newStars)
    this.setState({
      movie: {
        ...this.state.movie,
        stars: newStars
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/movies/`, this.state.movie)
      .then(res => {
        // console.log(res.data)
        this.props.setMovies(res.data)
        this.setState({ movie: emptyForm })
        this.props.history.push(`/`)
      })
      .catch(err => console.log(err))
  }

  render() {
    // console.log(this.state.movie)
    return (
      <div className="saved-list update-form">
        <h2>Add Movie</h2>
        <form onSubmit={this.handleSubmit}>
          <h4>Title:</h4>
          <input 
            type="text"
            name="title"
            value={this.state.movie.title}
            onChange={this.handleChange}
          />
          <h4>Director:</h4>          
          <input 
            type="text"
            name="director"
            value={this.state.movie.director}
            onChange={this.handleChange}
          />
          <h4>Metascore:</h4> 
          <input 
            type="number"
            name="metascore"
            value={this.state.movie.metascore}
            onChange={this.handleChange}
          />
          <h4>Actors:</h4>
          <input 
            type="text"
            name="0"
            value={this.state.movie.stars[0]}
            onChange={this.handleStars}
          />
          <input 
            type="text"
            name="1"
            value={this.state.movie.stars[1]}
            onChange={this.handleStars}
          />
          <input 
            type="text"
            name="2"
            value={this.state.movie.stars[2]}
            onChange={this.handleStars}
          />
          <button>Add</button>
        </form>
      </div>
    )
  }
}

export default AddForm;