import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {this.props.list.map(movie => {
          return (
            <NavLink
              to={`/movies/${movie.id}`}
              key={movie.id}
              activeClassName="saved-active"
            >
              <span className="saved-movie">{movie.title}</span>
            </NavLink>
          );
        })}
        <div className="home-button">
          <Link
            style={{
              paddingRight: 10,
              marginRight: 10,
              borderRight: '1px solid black'
            }}
            to="/"
          >
            Home
          </Link>
          <Link to="/movie/add">Add</Link>
        </div>
      </div>
    );
  }
}
