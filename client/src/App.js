import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm"

const App = () => {
  const [savedList, setSavedList] = useState([]);
  
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
          return <Movie {...props} addToSavedList={addToSavedList} updateSavedList={setSavedList}/>;
        }}
      />
      {/* props brings, for history, match, location.  Needs  to find my id.
      use render, when need more than just props. we also want savedList. */}
      <Route
        path="/update-movie/:id"
       render= {props => <UpdateForm {...props} savedList={savedList} updateSavedList={setSavedList}/>}
      />
    </>
  );
};

export default App;
