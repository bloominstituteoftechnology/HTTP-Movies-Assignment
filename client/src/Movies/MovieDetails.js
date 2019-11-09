import React from 'react';
import { Link } from 'react-router-dom'
import MovieCard from './MovieCard';

export default function MovieDetails({ movie, handleDelete }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} handleDelete={handleDelete} />
      <button className="delete-btn" onClick={(event) => handleDelete(event, movie.id)}>Delete</button>
    </Link>
  );
}