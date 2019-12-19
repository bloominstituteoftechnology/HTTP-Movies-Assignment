import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import logo from "./IMG/bblogo.png";
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movie, setMovie] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <img src={logo} alt="Blockbuster Logo Copyright THEM. NOT ME!" />
      <SavedList list={savedList} />{" "}
      <Route exact path="/" component={MovieList} />{" "}
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path="/update-movie/:id" component={UpdateMovie} />
    </>
  );
};

export default App;
