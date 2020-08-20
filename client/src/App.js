// https://github.com/royeradames/HTTP-Movies-Assignment.git
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from './Movies/UpdateMovie'
import AddMovie from './Movies/AddMovie'
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} movieList={movieList} setMovieList={setMovieList}/>
      </Route>
      <Route path={'/update-movie/:id'}>
        <UpdateMovie movieList={movieList} setMovieList={setMovieList}/>
      </Route>
      <Route path='/add-movie'>
        <AddMovie setMovieList={setMovieList}/>
      </Route>
    </>
  );
};

export default App;
