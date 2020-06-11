import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import {Link} from 'react-router-dom';

function Movie({ addToSavedList}) {
  const [movie, setMovie] = useState();
  const params = useParams();
  const { push } = useHistory;

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
    return <div>The data has been deleted......</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <Link to={`/`} 
        onClick={()=>{
          axios.delete(`http://localhost:5000/api/movies/${params.id}`, movie)
          .then((res) => {
            setMovie(...movie, res.data) 
            push("/movies")
          })
          .catch((err) => console.log(err))
          }}>
      <div className="delete-button">delete </div>
      </Link>
    </div>
  );
}

export default Movie;
