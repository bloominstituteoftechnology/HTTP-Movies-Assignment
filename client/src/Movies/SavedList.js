import React from 'react';
import { NavLink, Link } from 'react-router-dom';


function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <div className='savedMovieBox'>
            <NavLink
              to={`/movies/${movie.id}`}
              key={movie.id}
              className="saved-movie"
              activeClassName="saved-active"
            >
            {movie.title}
            </NavLink>
          </div>  

        );
      })}
      <div className="home-button">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default SavedList;
