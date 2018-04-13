import React, { Component } from "react";

export default class MovieCreate extends Component {
  state = {
    title: "",
    director: "",
    metascore: 0,
    stars: []
  };

  render() {
    
    return (
      <div>
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={}
        />
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={}
        />
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={}
        />
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={}
        />
      </div>
      
    )
  }
}
