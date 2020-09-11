import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from './Movies/UpdateMovie';
import CreateMovie from './Movies/CreateMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const history = useHistory();
  

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };


  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
    setRefresh(false);
  }, [refresh]);

  const addMovieHandler = (e) => {
    e.preventDefault();
    history.push('/movie/add');
  };

  return (
    <>
      <SavedList list={savedList} />
      <button onClick = {addMovieHandler}>Add a Movie</button>

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setRefresh = {setRefresh} />
      </Route>
      <Route
      exact
      path = '/update-movie/:id'
      render ={() => <UpdateMovie setRefresh = {setRefresh}/>}
      />
      <Route exact path = '/movie/add'>
        <CreateMovie setRefresh = {setRefresh} />
      </Route>
    </>
  );
};

export default App;
