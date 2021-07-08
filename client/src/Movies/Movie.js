import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList,  setMovieList}) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory()
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

  const deleteMovie = e => {
    e.preventDefault()

    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(resp => {
        console.log(resp)
        // filter out the movie that has the resp.data (resturn params.id) id that matches 
        const updateMovieList = movieList.filter( aMovie => aMovie.id !== resp.data)
        // set the new list 
        setMovieList(updateMovieList)
        // move to home page
        push('/')
      })
      .catch( error => console.error(`Error in delete Movie -- ${error}`))
  }

  if (!movie) return <div>Loading movie information...</div>;

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <button className="save-button" onClick={saveMovie}>
        Save
      </button>
      {/* adding edit button */}
      <button className="edit-button" onClick={() => push(`/update-movie/${params.id}`)}>
        Edit
      </button>
      <button className="edit-button" onClick={deleteMovie}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
