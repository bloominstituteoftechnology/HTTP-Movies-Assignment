import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Route, useHistory} from 'react-router-dom'

function Movie({ addToSavedList }) {
const history = useHistory (); //or it can be written as below as a shortcut 
//const { push } = useHistory (); 
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = (id) => {
    console.log("Remove Function is Running");
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then((res) => {
      history.push('/');
    })
    .catch((err) => console.log(err));
  }

  
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button className ="update-button"
      onClick={() =>history.push(`/update-movie/${params.id}`)}>Update</button> 
      {/* </div>onClick={() => push(`/update-movie/${movie.id}`)}>Edit</button>  if option 2 above is done then write this*/}
    
      <button className ="delete-button"
      onClick={() => deleteMovie(params.id)}>Delete</button> 
    </div>
  );
}

export default Movie;
