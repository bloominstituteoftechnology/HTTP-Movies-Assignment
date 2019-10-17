import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import "react-bulma-components/dist/react-bulma-components.min.css";
import UpdateMovie from "./Movies/UpdateMovie";


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [id, setId] = useState(0)

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const beginEdit = (editId) => {
    setId(editId)
  }

  const performEdit = (formValues, actions) =>  {

    actions.resetForm();
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateMovie {...props} />;
        }}
      />
    </>
  );
};

export default App;
