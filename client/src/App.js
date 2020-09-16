import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./components/SavedList";
import MovieList from "./components/MovieList";
import MovieUpdate from "./components/MovieUpdate";
import Movie from "./components/Movie";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        console.log("moviedata", res.data);
        setMovieList(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>
      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList={setMovieList} />
      </Route>

      <Route path="/update-movie/:id">
        <MovieUpdate MovieList={MovieList} setMovieList={setMovieList} />
      </Route>
    </>
  );
};

export default App;
