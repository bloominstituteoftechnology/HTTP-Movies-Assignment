import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import EditForm from './Movies/EditForm'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [isFetching, setIsFetching] = useState(false)
  const [increment, setIncrement] = useState(0);
  
useEffect(()=>{
  setIsFetching(true)
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data) 
        setIsFetching(false)
      })
      .catch(err => console.log(err.response));
  };

  setTimeout(()=>{
    getMovieList();
  },1500)

},[increment])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  if(isFetching === true){
    return(<h1>loading movies</h1>)
  }



  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} movieList = {movieList} setMovieList = {setMovieList} />
      </Route>
      <Route
        path="/edit-movie/:id"
        render={() => <EditForm movieList={movieList} setMovieList={setMovieList} increment={increment}setIncrement={setIncrement}/>}
      />
    </>
  );
};

export default App;
