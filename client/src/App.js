import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";

import AddForm from "./Movies/AddForm";
import Movie from "./Movies/Movie";
import MovieList from "./Movies/MovieList";
import SavedList from "./Movies/SavedList";
import UpdateForm from "./Movies/UpdateForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const { push } = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  const handleClick = () => {
    push("/add-movie");
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <button
        style={{
          background: "blue",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
          display: "block",
          margin: "0 auto",
          textAlign: "center",
          maxWidth: "100px",
        }}
        onClick={handleClick}
      >
        Add New Movie
      </button>
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route
        path="/update-movie/:id"
        render={(props) => (
          <UpdateForm
            {...props}
            movieList={movieList}
            setMovieList={setMovieList}
          />
        )}
      />

      <Route path="/movies/:id">
        <Movie
          movieList={movieList}
          addToSavedList={addToSavedList}
          setMovieList={setMovieList}
        />
      </Route>
      <Route path="/add-movie">
        <AddForm movieList={movieList} setMovieList={setMovieList} />
      </Route>
    </>
  );
};

export default App;
