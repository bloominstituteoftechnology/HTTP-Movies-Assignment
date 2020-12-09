import React, { useState, useEffect } from "react";
import { Route,Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import axios from 'axios';
import AddMovie from './Movies/AddMovie';
import AddForm from "./Movies/AddForm";

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
      <AddMovie />
      <Switch>
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList={setMovieList} movies={movieList}  />
      </Route>

      <Route path="/update-form/:id">
        <UpdateForm  movies={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path="/add-movie">
        <AddForm setMovieList={setMovieList}/>
      </Route>
     
      </Switch>
    </>
  );
};

export default App;
