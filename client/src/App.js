import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import axios from "axios";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [newMovie, setNewMovie] = useState({
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  const { push } = useHistory();

  const addMovieSubmit = (e) => {
    axios.post("http://localhost:5000/api/movies", newMovie);
    console.log("Here is the new movie", newMovie);
    push(`/`);
  };

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        console.log("Here is getMovieList: ", res.data);
        setMovieList(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [newMovie]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path="/update-movie/:id" component={UpdateMovie} />

      <Route path="/add-movie">
        <AddMovie
          newMovie={newMovie}
          setNewMovie={setNewMovie}
          addMovieSubmit={addMovieSubmit}
        />
      </Route>
    </>
  );
};

export default App;
