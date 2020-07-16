import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMoviePage from "./Movies/UpdateMoviePage";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response))
      .finally(() => setRefresh(false))
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    if (refresh){
    getMovieList();}
  }, [refresh]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} setRefresh={setRefresh}/>
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setRefresh={setRefresh} />
      </Route>
      <Route path="/update-movie/:id"><UpdateMoviePage setRefresh={setRefresh}/></Route>

    </>
  );
};

export default App;
