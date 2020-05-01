import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
// import axios from 'axios';

import UpdateMovie from './Movies/UpdateMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  // const [movieList, setMovieList] = useState([]);

  // const getMovieList = () => {
  //   axios
  //     .get('http://localhost:5000/api/movies')
  //     .then(res => setMovieList(res.data))
  //     .catch(err => console.log(err.response));
  // };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  // useEffect(() => {
  //   getMovieList();
  // }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path='/' component={MovieList} />

      <Route
        path='/update-movie/:id'
        render={props => {
          return <UpdateMovie {...props} />;
        }}
      />

      <Route
        path='/movies/:id'
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      {/* <Route path='/movies/:id'
      render={ props => {
      return <Movie {...props} addToSavedList={addToSavedList}}
         /> */}
    </>
  );
};

export default App;

//
