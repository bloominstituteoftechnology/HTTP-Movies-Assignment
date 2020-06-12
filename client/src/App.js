import React, { useState, useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
// import UpdateMovie from './Movies/UpdateMovie';
import UpdateForm from "./Movies/UpdateMovie";
// import MovieForm from "./Movies/MovieForm";

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

      {/* <NavLink exact to="/add-movie">
        Add Item
      </NavLink> */}
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route 
        path="/movies/:id"
        render={props=> <UpdateForm {...props}  setMovieList={setMovieList}/>}
      />
      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
      {/* <Route path="/add-movie" render={props=> <MovieForm {...props}  setMovieList={setMovieList}/>} /> */}
    </>
  );
};

export default App;
