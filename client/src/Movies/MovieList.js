import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import { API_URL } from '../App';

export default function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieDetails key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function MovieDetails({ movie }) {
  return (
    <Link
      style={{ color: 'inherit', textDecoration: 'none' }}
      to={`/movies/${movie.id}`}
    >
      <MovieCard movie={movie} />
    </Link>
  );
}
