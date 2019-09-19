import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const getMovies = () => {
      axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response))
  };

  const removeMovie = id => {
      setMovies(movies.filter(movie => movie.id != id))
  };

  const updateMovie = updatedMovie => {
    setMovies(movies.map(movie => (
      movie.id === updatedMovie.id ? updatedMovie: movie
    )));
  };

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <>
      <SavedList list={savedList} />
      <Route 
        exact path="/" 
        render={props => <MovieList {...props} movies={movies} />}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </>
  );
};

export default App;
