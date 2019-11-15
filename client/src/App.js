import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovie from './Movies/UpdateMovie';
import Movie from "./Movies/Movie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);
  

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={() => 
         <MovieList  movies={movies}setMovies={setMovies}/>}/>
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} movies={movies} setMovies={setMovies} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path='/update-movie/:id' render={props => <UpdateMovie {...props}movies={movies} setMovies={setMovies} />} />
    </>
  );
};

export default App;

