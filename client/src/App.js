import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./components/UpdateMovie";
import DeleteMovie from './components/DeleteMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/updatemovie'>Update</Link>
        <Link to='/deletemovie'>Delete</Link>
      </nav>

      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route path='/updatemovie' component={UpdateMovie} />
      <Route path='/deletemovie' component={DeleteMovie} />

      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </div>
  );
};

export default App;
