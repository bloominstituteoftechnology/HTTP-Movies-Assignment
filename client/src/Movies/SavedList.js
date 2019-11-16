import React from 'react';
import { NavLink, Link } from 'react-router-dom';


export default function SavedList (props) {
  const clearSavedList = () => {
    props.setSavedList('');
   }  
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {props.list && props.list.length >0 ?props.list.map(movie => {
          return (
            <NavLink
              to={`/movies/${movie.id}`}
              key={movie.id}
              activeClassName="saved-active"
            >
              <span className="saved-movie">{movie.title}</span>
            </NavLink>
          );
        }):null }
        <div className="home-button">
          <Link to="/">Home</Link>      
          <hr/>  
        <div className="clear-saved" onClick={clearSavedList}>Clear</div>
      </div>
      </div>
    );
  }


