import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };
  const {id} = useParams();
  const {push} = useHistory()

  const saveMovie = () => {
    addToSavedList(movie);
  };
  const updateMovie= () =>{
    push(`/update-movie/${id}`)
  }
  const deleteMovie= () =>{
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      push('/')
    })
  }
  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className='button'>
          <div className="buttonIn" onClick={saveMovie}>
            Save
          </div>
          <div className="buttonIn" onClick={updateMovie}>
            Update
          </div>
          <div className="buttonIn" onClick={deleteMovie}>
            delete
          </div>
      </div>
    </div>
  );
}

export default Movie;
