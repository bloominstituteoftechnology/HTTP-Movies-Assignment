import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import styled from 'styled-components';

const MovieList = props => {
  const movies = props.movies.slice().reverse();

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieDetails key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color: #000;
  }
`

function MovieDetails({ movie }) {
  return (
    <StyledLink to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </StyledLink>
  );
}

export default MovieList; 