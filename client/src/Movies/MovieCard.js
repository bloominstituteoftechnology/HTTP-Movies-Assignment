import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom'
import axios from 'axios';

const MovieCard = props => {
  console.log(props)
  const params = useParams();
  
  let history = useHistory();
  
  const removeMovie = () => {
    axios 
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res =>  {history.push("/"); props.setRefresh(true)})
      .catch(err => console.log(err));
  }

  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <Link to={`/update-movie/${params.id}`}><button>Edit</button></Link>
      <button onClick ={removeMovie}>Delete</button>
      <h2>{title}</h2>
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
    </div>
  );
};

export default MovieCard;