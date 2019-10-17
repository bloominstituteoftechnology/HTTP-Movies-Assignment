import React from "react";

export default function UpdateMovieForm({ listMovies, match }) {
  const daMovie = listMovies.find(item => {
    return item.id === Number(match.params.id);
  });
  debugger;

  return <div>I want to update the movie oo</div>;
}
