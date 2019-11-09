import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieDetails from "./MovieDetails";

export default function MovieList (props) {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios
    .get("http://localhost:5000/api/movies")
    .then(result => setMovies(result.data))
    .catch(error => console.log(error.respone));
  }, [])
//useEffect runs axios one time w empty dependency array

  const handleDelete = (event, id) => {
    event.preventDefault()
    const movie = movies.find(movie => movie.id === id)

    if (window.confirm('Sure you want to delete this?'))
    setMovies(movies.filter(movie => movie.id !== id))
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(result => {
        alert('Deleted.')
      })
      .catch(error => {
        console.log(error)
        setMovies([ ...movies, movie ])
      })
  }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <>
        <MovieDetails key={movie.id} movie={movie} handleDelete={handleDelete} />
        </>
      ))}
    </div>
  );
}
