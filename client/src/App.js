import React, { useState, useEffect, Fragment } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie"
import AddMovie from "./Movies/AddMovie";
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
    getMovieList();
  }, [refresh]);

  return (
    <Fragment>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} movieList={movieList} setMovieList={setMovieList}/>
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovie setMovieList={setMovieList} getMovieList={getMovieList} setRefresh={setRefresh} />
      </Route>

      <Route path="/add-movie">
        <AddMovie addToSavedList={addToSavedList}/>
      </Route>
    </Fragment>
  );
};

export default App;
