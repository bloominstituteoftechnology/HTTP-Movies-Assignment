import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from './Movies/UpdateForm';
import axios from 'axios'

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [movie, setMovie] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };


  useEffect(()=>{
    axios
    .get("http://localhost:5000/api/movies")
    .then(res => setMovie( res.data ))
    .catch(err => console.log(err.response));
  }, [])

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={props => {
        return <MovieList {...props} addToSavedList={addToSavedList}/>
      }} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} movie={movie} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path='/update-movie/:id'
    render={props => {
      return <UpdateForm {...props} movie={movie} addToSavedList={setMovie}/>
    }}
    />
    </>
  );
};

export default App;
