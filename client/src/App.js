import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieEdit from "./Movies/MovieEdit"
import CreateMovie from './Movies/CreateMovie';
import axios from 'axios';


const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  
  useEffect(() => {
    axios
      .get("http://localhost:3333/savedList")
      .then(res => setSavedList(res.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route path="/movies/:id" render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} /> }}
      />
       <Route  path="/movies/:id" render={props => {
          return <MovieEdit {...props} savedList={savedList} setSavedList={setSavedList}/>}}
      />
      <Route path="/movie/create" component={CreateMovie} />

    </div>
  );
};

export default App;
