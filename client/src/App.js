import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateForm from './component/UpdateForm'
import AddMovie from './component/UpdateForm'
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [newMovie, setNewMovie] = useState ({
    id:Date.now(),
    title:"",
    director:"",
    metascore:"",
    actors:[]
  })

  const { push } = useHistory();
  const addMovieSubmit = (e) => {
    axios.post("http://localhost:5000/api/movies, newMovie")
    console.log("Here is the new movie", newMovie)
    push(`/`)
  }
//1. Tell App to refetch data or pass a function to UsdateForm that will update the items data with a new array
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      // .then(res => setMovieList(res.data))
      // .catch(err => console.log(err.response));
      .then((res) => {
        console.log("Here is getMovieList:", res.data)
        setMovieList(res.data);
      })
      .catch((err) => console.log(err.response))
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [newMovie]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList ={setMovieList}/>
      </Route>
      <Route exact path ="/update-movie/:id"> <UpdateForm/>
        
      </Route>
      {/* <Route exact path = "/update-movie/:id"><UpdateForm/> </Route>
       */}
      {/* Add a new route for the UpdateForm
      -path : /update-movie/:id   Adding a path that contains a dynamic param*/}
    <Route path = "/add-movie">
      <AddMovie  
      newMovie={newMovie}
      setNewMovie ={setNewMovie}
      addMovieSubmit={addMovieSubmit}/>
    </Route>
    </>
  );
};

export default App;
