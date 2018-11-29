import React from "react";
import axios from "axios";

class MovieCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      director: "",
      metascore: null,
      stars: []
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addMovie = () => {
    let blank = {
      title: "",
      director: "",
      metascore: null,
      stars: []
    };
    let movie = {
      ...this.state,
      stars: this.state.stars.split(",")
    };
    axios
      .post("http://localhost:5000/api/movies", movie)
      .then(this.setState({ blank }))
      .catch(err => console.error(err));
    this.props.history.push("/");
  };

  render() {
    return (
      <form onSubmit={this.addMovie}>
        <input type="text" name="title" onChange={this.handleChange} />
        <input type="text" name="director" onChange={this.handleChange} />
        <input type="text" name="metascore" onChange={this.handleChange} />
        <input type="text" name="stars" onChange={this.handleChange} />
        <button type="submit">Add Movie</button>
      </form>
    );
  }
}

export default MovieCreate;
