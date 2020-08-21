  
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMoviePage from "./Movies/UpdateMoviePage";
import axios from 'axios';
import UpdateForm from './Movies/UpdateForm';



const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [refresh, setRefresh] = useState(true)

  const getMovieList = () => {
    axios
      .get("http://localhost:5500/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [refresh]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList component={movieList} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateForm setMovieList={setMovieList} setRefresh={setRefresh}/>
      </Route>
    </>
  );
};

export default App;
