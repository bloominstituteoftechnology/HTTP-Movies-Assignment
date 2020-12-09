import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList,setMovieList,movies }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie=()=>{
    console.log('movie=',movie)
    history.push(`/update-form/${params.id}`)
  };

  const deleteMovie=()=>{
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(res=>{
      console.log('res after delete',res.data);
      const filteredList = movies.filter(item=>{
         return item.id !== Number(params.id)})
      setMovieList(filteredList);
      console.log('filter',filteredList)
      history.push('/')
    })
    .catch(err=> console.log('error',err))
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className="edit-button" onClick={updateMovie}>
        Edit
      </div>

      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>

    </div>
  );
}

export default Movie;
