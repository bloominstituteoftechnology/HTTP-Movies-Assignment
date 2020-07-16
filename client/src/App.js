import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateForm from "./Movies/UpdateForm";
import { useHistory } from "react-router-dom";

import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  let history = useHistory();

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

  const updateMovie = movie => {
    console.log("Update movie", movie)
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res)
        history.push("/");
        getMovieList();
      })
  }

  const removeMovie = id => {
    console.log("in app, remove movie", id);
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList removeMovie={removeMovie} movies={movieList} />
      </Route>

      <Route exact path="/update-movie/:id">
        <UpdateForm updateMovie={updateMovie}/> 
      </Route>

      <Route path="/movies/:id">
        <Movie save={true} addToSavedList={addToSavedList} />
      </Route>
    </>
  );
};

export default App;
