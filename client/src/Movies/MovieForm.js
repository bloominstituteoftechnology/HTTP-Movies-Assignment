import React from 'react'

class MovieForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      director: '',
      metascore: '',
      stars: ['']
    }
  }

  handleUpdate = (e) => {
    if (!Object.keys(this.state).includes(e.target.id)) {
      const stars = this.state.stars
      stars[e.target.id] = e.target.value
      this.setState({ stars: stars })
    } else {
      this.setState({ [e.target.id]: e.target.value })
    }  
  }

  handleClick = (e) => {
    this.setState({ stars: this.state.stars.concat('') })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createMovie(this.state)
  }

  addStarState() {
    if (this.state.stars.every(star => star != '')) {
      return "" // Means 'enabled' in HTML
    }
    return "disabled"
  }

  addMovieState() {
    const valid = Object.entries(this.state).every(([key, value]) => {
      if (key == 'stars') {
        return value.some((star) => star != '')
      }
      return value != ''
    })
    if (valid) {
      return ""
    }
    return "disabled"
  }

  render() {
    return (
      <div class="add-movie">
        <h2>Add a movie!</h2>
        <form className="movie-form" onSubmit={this.handleSubmit}>
          <div class="left">
            <input
              id="title"
              value={this.state.title}
              onChange={this.handleUpdate}
              placeholder="Movie Title" />
            <input
              id="director"
              value={this.state.director}
              onChange={this.handleUpdate}
              placeholder="Director" />
            <input 
              id="metascore"
              value={this.state.metascore}
              onChange={this.handleUpdate}
              placeholder="Movie's Metascore" />
          </div>
          <div class="right">
          {this.state.stars.map((star, inputId) => (
            <input
              key={inputId}
              id={inputId}
              value={star}
              onChange={this.handleUpdate}
              placeholder="Starring actor" />
          ))}
          </div>  
          <div className="controls">
            <button
              className="add-star-button"  
              onClick={this.handleClick}
              disabled={this.addStarState()}
              type="button"
              >Add Star</button>
            <button
              className="add-movie-button"  
              type="Submit"
              disabled={this.addMovieState()}>Add movie</button>  
          </div>
        </form>
      </div>  
    )
  }
}

export default MovieForm