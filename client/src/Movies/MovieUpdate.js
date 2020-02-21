import React from 'react';

const MovieUpdate = () => {

  updatedMovie = (id, updateMovie) => {
    axios
    .put(`http://localhost:5000/ap/movie/${id}`, updateMovie)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return null
}

export default MovieUpdate;