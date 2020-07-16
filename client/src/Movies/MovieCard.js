import React from 'react';
import { Link } from "react-router-dom";
import { IoIosCloseCircle, IoMdCreate } from "react-icons/io";
import { useHistory } from "react-router-dom";

const MovieCard = props => {
  let history = useHistory();

  const removeMovie =  (id) => {
    console.log("remove movie");
    if (window.confirm('Are you sure you want to remove this movie?')) {

    }else{
      history.push('/');
    }
  }


  const { id, title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <Link key={id} to={`/movies/${id}`}>
        <h2>{title}</h2>
      </Link>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      
      <Link to={`/update-movie/${props.movie.id}`}>  
      <div className="update-button" >
        Update
      </div>
      </Link>

      <div className="remove-button">
        <IoIosCloseCircle className="remove" onClick={removeMovie}/>
      </div>
      
      
    </div>
  );
};

export default MovieCard;
