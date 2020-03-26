import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import EditMovie from './Movies/EditMovie';
import axios from 'axios';

const App = () => {
  const [ savedList, setSavedList ] = useState([]);
  const [ movieList, setMovieList ] = useState([]);

  //Let App.js know if changes are made, re-render data if changed
  const [ movieCount, setMovieCount ] = useState(0);
  const [ editCount, setEditCount ] = useState(0);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data);
        //Init movie count
        setMovieCount(res.data.length);
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  //Functions to update the state so App.js shows updated values
  const decreaseMovieCount = () => {
    setMovieCount(movieCount - 1);
  }
  const handleEditCount = () => {
    setEditCount(editCount + 1);
  }

  //Update data as it changes (delete or edit)
  useEffect(() => {
    getMovieList();
  }, [movieCount, editCount]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} decreaseMovieCount={decreaseMovieCount}/>
      </Route>

      <Route path='/update-movie/:id'>
        <EditMovie handleEditCount={handleEditCount}/>
      </Route>

    </>
  );
};

export default App;