import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import NewMovieForm from './Movies/NewMovieForm'
import axios from 'axios';
import UpdateMovieForm from "./Movies/UpdateForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    const foundItem = savedList.find(item => item.id === movie.id)
    if(!foundItem) {
      setSavedList([...savedList, movie]);
    } 
  };


  const removeFromSavedList = movie => {
    setSavedList( [...savedList].filter(item => item.id !== movie.id) )
  }


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
        <Movie 
          addToSavedList={addToSavedList} 
          removeFromSavedList={removeFromSavedList} 
          updateMovieList={getMovieList}
        />
      </Route>

      <Route path="/new-movie">
        <NewMovieForm updateMovieList={getMovieList}/>
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovieForm updateMovieList={getMovieList}/>
      </Route>

    </>
  );
};

export default App;
