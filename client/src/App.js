import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
 
const App = () => {
 
 const [movies, setMovies] = useState([]);
 const [savedList, setSavedList] = useState([]);
 
 useEffect(() => {
   axios
     .get('http://localhost:5000/api/movies/')
     // .then(res => console.log(res.data))
     .then(res => setMovies(res.data))
     .catch(error => console.log(error));
 }, []);
 
 
 const addToSavedList = movie => {
   setSavedList([...savedList, movie]);
 };
 
 return (
   <>
     <SavedList list={savedList} />
     <Route exact path="/" component={MovieList} />
     <Route
       path="/movies/:id"
       render={props => {
         return <Movie {...props} addToSavedList={addToSavedList} movies={movies} setMovies={setMovies} />;
       }}
     />
     <Route
       path="/update-form/:id"
       render={props => (
         <UpdateMovie {...props} movies={movies} setMovies={setMovies} />
       )}
     />
   </>
 );
};
 
export default App;
