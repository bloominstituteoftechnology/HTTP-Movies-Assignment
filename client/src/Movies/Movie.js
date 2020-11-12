import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";


function Movie({ addToSavedList, update, setUpdate }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

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
 //Add the Delete Handler you are changing movieList pass thru props
  const handleDelete = () => {
     
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res=>{
      setUpdate(!update);
      })
      .catch(err=>{
        console.log(err);
      })
      push('/')
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button onClick={()=>{
        push(`/update-movie/${movie.id}`);
      }}>Update Title</button>
      <button onClick={handleDelete}>
        Delete
      </button>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
