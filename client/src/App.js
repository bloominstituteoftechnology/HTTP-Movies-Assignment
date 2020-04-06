import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import AddMovieForm from "./Movies/AddMovieForm";

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  console.log(movieList);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const updateMovieList = (id, updateMovie) => {
    const splitMovies = { ...updateMovie, stars: updateMovie.stars.split(",") }; // uses .split() method to turn updateMovie data back into an array

    axios
      .put(`http://localhost:5000/api/movies/${id}`, splitMovies)
      .then((res) => {
        const movieMatch = movieList.map((movie) => {
          // maps over movieList array and matches movie id's with PUT response data id's
          if (movie.id === res.data.id) {
            return res.data; // returns PUT response data if id's match
          } else {
            return movie; // returns current movie if PUT response id and movie id's DO NOT match
          }
        });
        // console.log(movieMatch);
        setMovieList(movieMatch);
        props.history.push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };

  const deleteMovie = (id, updateMovie) => {
    const splitMovies = {
      ...updateMovie,
      stars: updateMovie.stars.split(","),
    };

    axios
      .delete(`http://localhost:5000/api/movies/${id}`, splitMovies)
      .then((res) => {
        // console.log(res);
        setMovieList(res.data);
        props.history.replace("/");
      })
      .catch((err) => console.log(err));
  };

  const addMovie = (addNewMovie) => {
    const splitMovies = { ...addNewMovie, stars: addNewMovie.stars.split(",") };

    axios
      .post("http://localhost:5000/api/movies", splitMovies)
      .then((res) => {
        console.log(res.data);
        setMovieList(res.data);
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const addMovieHandler = (e, id) => {
    e.preventDefault();

    props.history.push(`/add-movie/${id}`);
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <button onClick={addMovieHandler}>Add New Movie</button>
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovie={deleteMovie} />
      </Route>

      <Route
        path="/update-movie/:id"
        render={(props) => (
          <UpdateMovieForm
            {...props}
            movies={movieList}
            updateMovieList={updateMovieList}
          />
        )}
      />
      <Route
        path="/add-movie/:id"
        render={(props) => <AddMovieForm {...props} addMovie={addMovie} />}
      />
    </>
  );
};

export default App;
