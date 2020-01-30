import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import UpdateForm from "./Movies/UpdateForm.js";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <Router>
      <div>
        <SavedList list={savedList} />
        <Route exact path="/" component={MovieList} />
        <Route
          path="/movies/:id"
          render={props => {
            return <Movie {...props} addToSavedList={addToSavedList} />;
          }}
        />
        <Route
          path="/update-form/:id"
          render={props => (
            <UpdateForm {...props} movies={movies} setMovies={setMovies} />
          )}
        />
      </div>
    </Router>
  );
};

export default App;
