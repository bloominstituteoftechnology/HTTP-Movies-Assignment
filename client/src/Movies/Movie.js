import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory, Route, withRouter } from "react-router-dom";

import MovieCard from "./MovieCard";


function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState('');
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  let history = useHistory()

  const deleteMovie = (e) => {
     e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => history.push('/'))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, []);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} /><br/>
      

      <button onClick={saveMovie}>
        ADD
      </button>

   
       <Link to= {`/update-movies/${params.id}`}> 
          <button> UPDATE </button> 
      </Link>
      <br/>
    </div>
  );
}

export default withRouter(Movie);
