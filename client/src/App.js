import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovie from './Movies/UpdateMovie'
import Movie from "./Movies/Movie";
import { axiosCall } from './utils/axiosCall'

const initialState = []

const App = () => {
  const [savedList, setSavedList] = useState(initialState);
  const [movieList, setMovieList] = useState(initialState);

  const getMovieList = () => {
    axiosCall()
      .get("/api/movies")
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
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path='/update-movie/:id' 
      render={props => {
      return <UpdateMovie {...props} setMovieList={setMovieList}/>
        }}>
      
      </Route>
    </>
  );
};

export default App;
