import React from 'react';
import { NavLink, Link, useParams, useHistory } from 'react-router-dom';
import axios from "axios";

const SavedList = ({ list }, props) =>  {
          const params = useParams();

  
  return (
    <div className="saved-list">
      <h3>Watchlist:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
            <button onClick={()=> list.pop(movie)}> X  </button> 
          </NavLink>

        );
      })}
       
    </div>
  );
}

export default SavedList;
