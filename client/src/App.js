import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import Movie from "./Movies/Movie";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList}/>
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} deleteMovie={deleteMovie} />;
        }}
      />
      <Route path="update-movie/:id" render={props => (
        <UpdateMovieForm {...props} savedList={savedList} setSavedList={setSavedList}/> 
      )} />
    </>
  );
};

export default App;
