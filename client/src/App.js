import React, { useState, useEffect } from "react";

// DEPENDENCIES
import { Route, withRouter, Link } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import AddMovieForm from "./Movies/AddMovieForm";

const App = props => {
  const [savedList, setSavedList] = useState([]);
  const [listMovies, setListMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const setMovieList = data => {
    setListMovies(data);
  };

  const updateMovie = movie => {
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        fetchMovies();
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const fetchMovies = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setListMovies(res.data);
      })
      .catch(err => alert(err.response));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        fetchMovies();
        props.history.push("/");
      })
      .catch(error => {
        alert(error);
      });
  };

  const addMovie = values => {
    debugger;
    axios
      .post("http://localhost:5000/api/movies", values)
      .then(res => {
        fetchMovies();
        props.history.push("/");
      })
      .catch(error => {
        alert(error)
      });
  };

  return (
    <>
      <SavedList list={savedList} />
      <Link to="/add-movie">Add movie</Link>
      <Route
        exact
        path="/"
        render={props => {
          return (
            <MovieList
              {...props}
              setMovieList={setMovieList}
              listMovies={listMovies}
            />
          );
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return (
            <Movie
              {...props}
              addToSavedList={addToSavedList}
              deleteMovie={deleteMovie}
            />
          );
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return (
            <UpdateMovieForm
              {...props}
              listMovies={listMovies}
              updateMovie={updateMovie}
            />
          );
        }}
      />
      <Route
        path="/add-movie"
        render={props => {
          return <AddMovieForm {...props} addMovie={addMovie} />;
        }}
      />
    </>
  );
};

export default withRouter(App);
