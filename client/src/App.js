import React, { useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovie from "./Movies/UpdateMovie";
import Movie from "./Movies/Movie";
import axios from 'axios';
import AddMovie from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  let location = useLocation();

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
  }, [location]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList setMovieList={setMovieList} movies={movieList} />
      </Route>
      <Route exact path="/update-movie/:id">
        <UpdateMovie movies={movieList} />
      </Route>
      <Route exact path="/add-movie">
        <AddMovie movies={movieList} />
      </Route>
      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
    </>
  );
};

export default App;
