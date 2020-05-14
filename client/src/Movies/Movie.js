import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const [ updates, setUpdates ] = useState("")
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };
  
  const updateMovie = (e) => {
    e.preventDefault();
    axios
    .put(`http://localhost:5000/api/movies/${params.id}`, { ...movie, title: updates })
    .then(res => {
      console.log(res)
      setMovie(res.data)
    })
    .catch(err => console.log(err.response))
  }
  
  const saveMovie = () => {
    addToSavedList(movie);
  };
  
  const deleteMovie = (e) => {
    e.preventDefault();
    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(res => {
      console.log(res)
      history.push("/")
      getMovieList()
    })
    .catch(err => console.log(err))
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

      <div className="save-button" onClick={saveMovie}> Save </div>
      <form onSubmit={updateMovie}>
        <h2>Update movie title</h2>
        <input type="text" onChange={e => setUpdates(e.target.value)} value={updates}/>
        <button>Submit</button>
      </form>
      <form onSubmit={deleteMovie}>
        <button>Delete Movie</button>
      </form>
    </div>
  );
}

export default Movie;
