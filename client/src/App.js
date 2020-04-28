import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateForm from "./Movies/UpdateForm"
import useLocalStorage from "./hooks/useLocalStorage"

const App = () => {
  const [savedList, setSavedList] = useLocalStorage({}, []);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie])
 }
  
  useEffect(() => {
    getMovieList();
  }, []);

  const setMovie = updatedMovie => {
    const updatedMovies = [...movieList];
    const index = updatedMovies.findIndex(item => item.id === updatedMovie.id);
    updatedMovies[index] = updatedMovie;
    setMovieList(updatedMovies);
  };

  const setSaved = savedMovie => {
    const savedMovies = [...savedList];
    const index = savedMovies.findIndex(item => item.id === savedMovie.id);
    savedMovies[index] = savedMovie;
    setSavedList(savedMovies);
  }

  const deleteMovies = deletedMovie => {
    const newMovies = [...movieList];
    const filteredMovies = newMovies.filter(item => item.id !== deletedMovie)
    setMovieList(filteredMovies);
  };

  const deleteSaved = deletedMovie => {
    const savedMovies = [...savedList]
  }


  return (
    <>
      <SavedList list={savedList} addToSavedList={addToSavedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovies={deleteMovies} />
      </Route>

      <Route exact path="/update-movie/:id"
          render={props => <UpdateForm {...props} movies={movieList} setMovie={setMovie} setSaved={setSaved} /> } />
    </>
  );
};

export default App;
