import React from "react";
import { NavLink, Link } from "react-router-dom";

const SavedList = props => {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {props.list.map(movie => (
        <NavLink
          key={movie.src}
          to={`/movies/${movie.id}`}
          activeClassName="saved-active"
          className="saved-movie"
        >
          <img className="saved-img" src={movie.src} alt="" />
        </NavLink>
      ))}
      <div>
        <Link to="/add" className="custom-button">
          Add
        </Link>
        &nbsp;
        <Link to="/" className="custom-button">
          Home
        </Link>
      </div>
    </div>
  );
};

export default SavedList;
