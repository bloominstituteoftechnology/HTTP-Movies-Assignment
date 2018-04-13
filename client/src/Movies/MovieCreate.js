import React, { Component } from "react";

export default class MovieCreate extends Component {
  state = {
    title: "",
    director: "",
    metascore: 0,
    stars: []
  };

  render() {
    var styles = {
      backgroundColor: "yellow"
    };
    return <div style={styles}>This the MovieCreate Component </div>;
  }
}
