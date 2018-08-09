import React from "react";

export default class CreateMove extends React.Component {
  state = {
    movie: {
      title: "",
      director: "",
      metascore: "",
      stars: [],
    },
  };

  handleOnChange = e => {
    e.persist();
    let value=''
    if (e.target.name === 'stars') {
      value = [e.target.value]
    } else {
      value = e.target.value
    }
    this.setState(prevState => ({
      movie: {
        ...prevState.movie,
        [e.target.name]: value
      },
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addMovie(this.state.movie);
    this.props.history.push('/')
  };

  render() {
    return (
      <form className='new-movie-form' onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleOnChange}
          name="title"
          type="text"
          value={this.state.name}
          placeholder="Title"
          required
        />
        <input
          onChange={this.handleOnChange}
          name="director"
          type="text"
          value={this.state.name}
          placeholder="Director"
          required
        />
        <input
          onChange={this.handleOnChange}
          name="metascore"
          type="number"
          value={this.state.name}
          placeholder="Metascore"
          required
        />
        <input
          onChange={this.handleOnChange}
          name="stars"
          type="text"
          value={this.state.name}
          placeholder="Stars"
          required
        />
        <button type="submit" value="Submit">
          
          Add
          
        </button>
      </form>
    );
  }
}
