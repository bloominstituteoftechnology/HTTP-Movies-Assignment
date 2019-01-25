import React from "react";
import axios from "axios";

class MovieCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      director: "",
      meta: "",
      stars: "",
      success: false,
      error: ""
    };
  }

  onInputChange = type => {
    this.setState({ success: false });
    if (type.target.dataset.name === "title") {
      this.setState({
        title: type.target.value
      });
    } else if (type.target.dataset.name === "director") {
      this.setState({
        director: type.target.value
      });
    } else if (type.target.dataset.name === "meta") {
      this.setState({
        meta: type.target.value
      });
    } else if (type.target.dataset.name === "stars") {
      this.setState({
        stars: type.target.value.split`, `
      });
    }
  };

  addToList = e => {
    e.preventDefault();
    (this.state.director &&
      this.state.title &&
      this.state.stars &&
      this.state.meta &&
      axios
        .post("http://localhost:5000/api/movies", {
          title: this.state.title,
          director: this.state.director,
          metascore: Number(this.state.meta),
          stars: this.state.stars
        })
        .then(res => {
          this.setState({ success: true });
        })
        .catch(err => {
          this.setState({ error: err });
        })) ||
      this.setState({ error: <h2>The Form Is Not Complete</h2> });
  };

  render() {
    return (
      <div className="form">
        {this.state.success && <h1>Successfully added movie!</h1>}
        {this.state.error && this.state.error}
        <form>
          <input
            type="text"
            value={this.state.title}
            onChange={this.onInputChange}
            data-name="title"
            placeholder="Title"
          />
          <input
            type="text"
            value={this.state.director}
            onChange={this.onInputChange}
            data-name="director"
            placeholder="Director"
          />
          <input
            type="number"
            value={this.state.meta}
            onChange={this.onInputChange}
            data-name="meta"
            placeholder="Metascore"
          />
          <input
            type="text"
            value={this.state.stars && this.state.stars.join`, `}
            onChange={this.onInputChange}
            data-name="stars"
            placeholder="Stars"
          />
          <button onSubmit={this.addToList} onClick={this.addToList}>
            Add Movie
          </button>
        </form>
      </div>
    );
  }
}

export default MovieCreate;
