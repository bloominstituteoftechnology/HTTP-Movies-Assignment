import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovie from "./Movies/MovieForm";
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = (props) => {
  console.log('app', props)
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => { 
    let xx = savedList.map(savedInList => {
      return savedInList.title
    })
    if (xx.includes(movie.title)) {
      alert('cant add 2 movies of the same title')
    } else {
      setSavedList([...savedList, movie])
    }    
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
        path="/movies/:id"
        render={props => <Movie {...props} addToSavedList={addToSavedList} />}
        >
        <Movie addToSavedList={addToSavedList} />
      </Route>
      
      <Route
        path={`/update-movie/:id`}
        render={props => <UpdateMovie {...props} movies={movieList} />}
      />
    </>
  );
};

export default App;

