import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function SavedList(props) {
  console.log(props.history)
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {props.list.map(movie => {
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
      {!props.add && (
        <div className="home-button" onClick={props.handleToggle}>
          <Link to="/add">Add Movie</Link>
        </div>
      )}
      <div className="home-button" onClick={(props.history.location.pathname === '/add' ? props.handleToggle : undefined)}>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
