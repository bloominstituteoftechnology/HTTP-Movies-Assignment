import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import Form from './Movies/Form'

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
    setSavedList([...savedList, movie]);
  };

  const deleteMov = movie => {
//     useEffect(()=> {    setSavedList([savedList.filter( m => m.title !== movie.title )])
// },[])
    // console.log(savedList)
    console.log('hello')
  }

  useEffect(() => {
    getMovieList();
  }, [movieList]);

  return (
    <div>
    <center><h1> My Favorite  Movies </h1>
     <div className="home-button">
        <Link to="/">Home</Link>
      </div>

    </center>
    <div class = 'row'>   
      

      <div class = "col">
         <div class = "col2">

          <Route exact path="/">
            <MovieList movies={movieList} />
          </Route>

          <Route path="/movies/:id">
            <Movie addToSavedList={addToSavedList} />
          </Route>

           <Route path="/update-movies/:id">
            <Form  />
          </Route>
        </div>
        </div>
         <div class = "col">
        <div class = "col1">

            <SavedList list={savedList} />
          </div>
          </div>

    </div>
    </div>

  );
};

export default App;
