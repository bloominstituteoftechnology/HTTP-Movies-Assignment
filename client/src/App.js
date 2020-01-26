import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import { MovieForm } from "./Movies/MovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateMovie = movie => {
    setSavedList(
      savedList.map(m => {
        if (m.id === movie.id) {
          return movie
        }
        return m
      })
    )
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={
          props => {
            return <Movie {...props} addToSavedList={addToSavedList} />;
          }}
      />
      <Route
        path="/update-movie/:id"
        render={
          props => {
            return <MovieForm {...props} updateMovie={updateMovie} />;
          }}
      />
    </>
  );
};

export default App;
