import React, { useEffect, useState } from "react";

import Movie from "./Movies/Movie";
import MovieList from "./Movies/MovieList";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import UpdateForm from "./Movies/UpdateForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
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

      <Route
        path="/update-movie/:id"
        render={(props) => (
          <UpdateForm {...props} setMovieList={setMovieList} />
        )}
      />

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
    </>
  );
};

export default App;
