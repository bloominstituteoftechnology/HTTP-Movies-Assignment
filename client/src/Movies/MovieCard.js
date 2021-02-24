import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const MovieCard = props => {
  const { title, director, metascore, stars, } = props.movie;
const {id} = useParams()
const {push} =useHistory()


  const update = e => {
    push(`/update-movie/${id}`)
  }

  const deleteItem = (e) => {
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res=>{
      console.log(res.data)
      push('/')
    })
    .catch(err=>{
      console.log('axios delete error', err.response)
    })
  }
  return (
    <div className="movie-card">
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
      <button onClick={update}>Update</button>
      <button onClick={deleteItem}>Delete</button>
    </div>
  );
};

export default MovieCard;
