import React, { Component } from "react";
import axios from "axios";

export default class MovieCreate extends Component {
  state = {
    title: "",
    director: "",
    metascore: 0,
    stars: []
  };

  handleInput = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const { title, director, metascore, stars } = this.state;
    const newMovie = { title, director, metascore, stars };
    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then(res => {
        console.log("this is the response from the post", res);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("something went wrong on the post request", err);
      });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleInput}
          name="title"
        />
        <input
          type="text"
          placeholder="Director"
          value={this.state.director}
          onChange={this.handleInput}
          name="director"
        />
        <input
          type="text"
          placeholder="Metascore"
          value={this.state.metascore}
          onChange={this.handleInput}
          name="metascore"
        />
        {/* i dont know how to add more than one actor?
         do i make a function that adds to the array? if so, how do i call it multiple times?
         do we expect the user to put them in all at once?
        */}
        {/* <input
          type="text"
          placeholder="Actor"
          value={this.state.actor}
          onChange={this.handleInput}
          name="actor"
        /> */}

        <button onClick={this.handleSubmit}>Add Movie</button>
      </div>
    );
  }
}
