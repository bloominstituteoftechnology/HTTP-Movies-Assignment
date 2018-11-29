import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const SavedList = ({ list }) => {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(({ src, id }) => (
        <NavLink
          key={src}
          to={`/movies/${id}`}
          activeClassName="saved-active"
          className="saved-movie"
        >
          <img className="saved-img" src={src} alt="" />
        </NavLink>
      ))}
      <div>
        <Link to="/add" className="nav-button">
          Add
        </Link>
        &nbsp;
        <Link to="/" className="nav-button">
          Home
        </Link>
      </div>
    </div>
  );
};

export default SavedList;
