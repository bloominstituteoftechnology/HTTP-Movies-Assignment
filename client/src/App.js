import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateForm from "./Movies/UpdateForm";
import Movie from "./Movies/Movie";
import axios from "axios";
import AddForm from "./Movies/AddForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log("hi", err));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [movieList]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <AddForm />
        <MovieList movies={movieList} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateForm movieList={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
    </>
  );
};

export default App;
