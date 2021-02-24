import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from './Movies/UpdateMovie'; 
import AddMovie from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [refresh, setRefresh] = useState(true)
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
    setRefresh(true)
    setNewMovie({
      title: "",
      director: "",
      metascore: "",
      stars: [],
    });


  };

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response))
      .finally(() => {setRefresh(false)})
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [refresh]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
      <Movie addToSavedList={addToSavedList} setRefresh={setRefresh} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovie setMovieList={setMovieList} setRefresh={setRefresh}/>
      </Route>
      <Route path="/add-movie">
      <AddMovie newMovie={newMovie} setNewMovie={setNewMovie}
        addMovieSubmit={addMovieSubmit} setRefresh={setRefresh}
      />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
    </>
  );
};

export default App;
