import React from 'react';
import { NavLink } from 'react-router-dom';

const SavedList = props => {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {props.list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={Math.random()}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
export default SavedList;
