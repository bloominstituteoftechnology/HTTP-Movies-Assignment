import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from "./Movies/MovieForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        console.log("GET", res)
        setMovies(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Route path="/update-movie/:id"
        render={props => {
          return <MovieForm {...props}  movies={movies} setMovies={setMovies}/>;
        }}
        />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </div>
  );
};

export default App;