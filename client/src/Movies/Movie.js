import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, props }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const push = useHistory()

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

  const onDelete = () => {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then((res)=>{
      props.setMovie(res.data)
      push(`/`)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
    <div>
    <Link to={`/update-movie/${params.id}`}>Edit</Link>
    </div>
    
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div onClick={onDelete}>Delete Movie</div>
    </div>
  );
}

export default Movie;
