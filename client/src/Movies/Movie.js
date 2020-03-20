import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = () => {

    const id = (match.params.id)
    console.log(id)

    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res);

        console.log("going to push to new url");
        history.push("/item-list");
        console.log("past push to new url");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      <div className='save-button' onClick={saveMovie}>Save</div>
      <Link to={`/update-movie/${match.params.id}`}>
          <div className="edit-button">
              Edit
          </div>
      </Link>
      <div className = 'delete-button' onClick={deleteMovie}>Delete</div>
    </div>
  );
}

export default Movie;
