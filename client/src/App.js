import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie.js';
import axios from 'axios';


const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const editMovie = movie => {
    setMovies(movie);
  }
  console.log("props:", props);


  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} editMovie={editMovie} />;
        }}
      />
      <Route exact path='/update-movie/:id'
        render={props =>{
          return <UpdateMovie {...props} movies={movies}/>
        }}
      />
    </>
  );
};

export default App;
