import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateForm from './Movies/UpdateForm';
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const updateMovie = (data, id) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, data)
      .then((res) => {
        if (res.status === "OK") {
          getMovieList();
        }
      })
      .catch((err) => console.log(err));
  }

  const addNewMovie = (data) => {
    axios
      .post(`http://localhost:5000/api/movies`, data)
      .then((res) => {
        if (res.statusText === "Created") {
          getMovieList()
        }
      })
      .catch((err) => console.log(err));
  };

  const addToSavedList = movie => {
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
      <Route exact path='/add-movie' render={(props) => (
        <UpdateForm 
          {...props}
          movieList={movieList}
          addNewMovie={addNewMovie}
        />
      )}
      />
       <Route exact path='/update-movie/:id' render={(props) => (
        <UpdateForm
          {...props}
          movieList={movieList}
          updateMovie={updateMovie}
        />
      )}
      />
      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
    </>
  );
};

export default App;
