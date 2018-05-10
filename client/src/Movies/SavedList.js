import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {/* <span key={movie.id} className="saved-movie">{movie.title}</span> */}
        {this.props.list.map(movie => (
          <NavLink  key={movie.id} to={`/movies/${movie.id}`} >{movie.title}</NavLink>
        ))}
        <Link to="/" className="home-button">Home</Link>
        {/* <div className="home-button">Home</div> */}
      </div>
    );
  }
}
