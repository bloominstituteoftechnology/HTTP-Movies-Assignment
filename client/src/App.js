import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
<<<<<<< HEAD
import axios from 'axios';
import UpdateMovie from "./UpdateMovie";
=======
import axios from "axios";
import UpdateForm from "./Movies/updateForm";
>>>>>>> e1fa637f0377ea0cd4b62a1491ae34aae30669a7

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      <SavedList list={savedList} />
<<<<<<< HEAD

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route exact path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
       <Route exact path="/update-movie/:id" render={(props)=>{
        return(<UpdateMovie {...props} setMovieList={setMovieList}/>); 
       }} /> 
    </>
=======
      <Switch>
        <Route exact path="/">
          <MovieList movies={movieList} />
        </Route>
        <Route exact path="/update-movie/:id" >
        <UpdateForm movieList={movieList} setMovieList={setMovieList}/>
        </Route>

        <Route path="/movies/:id">
          <Movie addToSavedList={addToSavedList} />
        </Route>
      </Switch>
    </div>
>>>>>>> e1fa637f0377ea0cd4b62a1491ae34aae30669a7
  );
};

export default App;
