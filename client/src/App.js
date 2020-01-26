import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import { MovieForm } from "./Movies/MovieForm";
import { AddMovieForm} from './Movies/AddMovieForm'

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

  const removeMovie = id => {
    setSavedList(
      savedList.filter(m => m.id !== id)
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
            return <Movie {...props} removeMovie={removeMovie} addToSavedList={addToSavedList} />;
          }}
      />
      <Route
        path="/update-movie/:id"
        render={
          props => {
            return <MovieForm {...props} updateMovie={updateMovie} />;
          }}
      />
      <Route
        path="/add"
        render={
          props => {
            return <AddMovieForm {...props} addToSavedList={addToSavedList} />
          }
        }/>
    </>
  );
};

export default App;
