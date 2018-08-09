import React, { Component } from 'react';

class MovieCreate extends Component {
  state = {
    title: '',
    director: '',
    metascore: 0,
    stars: []
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({
      [name]: name === 'stars' ? value.split(',').map(s => s.trim()) : value
    });

  render() {
    let { title, director, metascore, stars } = this.state;
    stars = stars.join(',');
    return (
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          this.props.onSubmit(this.state);
          this.setState({
            title: '',
            director: '',
            metascore: 0,
            stars: []
          });
        }}
      >
        <div className="form__group">
          <input
            className="form__input"
            onChange={this.handleChange}
            type="text"
            name="title"
            placeholder="title"
            value={title}
          />
        </div>
        <div className="form__group">
          <input
            className="form__input"
            onChange={this.handleChange}
            type="text"
            onChange={this.handleChange}
            name="director"
            placeholder="director"
            value={director}
          />
        </div>
        <div className="form__group">
          <input
            className="form__input"
            onChange={this.handleChange}
            type="number"
            name="metascore"
            placeholder="metascore"
            value={metascore}
          />
        </div>
        <div className="form__group">
          <input
            className="form__input"
            type="text"
            onChange={this.handleChange}
            name="stars"
            placeholder="stars"
            value={stars}
          />
        </div>
        <button className="form__button">Submit</button>
      </form>
    );
  }
}

export default MovieCreate;
