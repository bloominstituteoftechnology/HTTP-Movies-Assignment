import React, { Component } from "react";
import axios from "axios";

class MovieCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      director: "",
      metascore: "",
      stars: [""]
    };
  }

  handleTextInput = e => {
    this.setState({ [e.target.title]: e.target.value });
  };

  addMovie = () => {
    const movie = {
      title: this.state.title,
      director: this.state.director,
      metascore: this.state.metascore,
      stars: this.state.stars.split(", ")
    };

    axios
      .post(`http://localhost:3333/api/movies`, movie)
      .then(movie => {
        this.props.updateMovies();
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ title: "", director: "", metascore: "", stars: [""] });
  };

  render() {
    return (
      <div className="movie-card formCard">
        <div>
          <input
            title={"title"}
            placeholder={"Title"}
            value={this.state.title}
            onChange={this.handleTextInput}
          />
        </div>
        <div>
          <input
            title={"director"}
            placeholder={"Director"}
            value={this.state.director}
            onChange={this.handleTextInput}
          />
        </div>
        <div>
          <input
            title={"metascore"}
            placeholder={"Metascore"}
            value={this.state.metascore}
            onChange={this.handleTextInput}
          />
        </div>
        <div>
          <input
            title={"stars"}
            placeholder={"Actors separated by comma"}
            value={this.state.stars}
            onChange={this.handleTextInput}
          />
        </div>
        <button onClick={this.addMovie}>Submit</button>
      </div>
    );
  }
}

export default MovieCreate;