import React, { useState, useEffect } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import EditMovieForm from "./Movies/EditMovieForm";
import AddMovieForm from "./Movies/AddMovieForm";

const App = props => {
  const [savedList, setSavedList] = useState([]);
  const [listMovies, setListMovies] = useState([]);

  //Add a film to saved list
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

 //render list 
  const setMovieList = movies => {
    setListMovies(movies);
  };

//update 
  const updateMovie = movie => {
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(result => {
        fetchMovies();
        props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

//display GET request from api
  const fetchMovies = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(result => {
        setListMovies(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);
//empty dependency array for fetch to stop repeating fetch
//delete and id of movie using template literal
  const deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(result => {
        fetchMovies();
        props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  //add film
  const addMovie = values => {
    axios
      .post("http://localhost:5000/api/movies", values)
      .then(res => {
        fetchMovies();
        props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
    <h1>Welcome to Your Movie List!</h1>
    <h4>Add, Update, Save, or Delete from Your Database.</h4>
      <SavedList list={savedList} />
      <button className="add-movie">
      <Link to="/add-movie">Add movie</Link>
      </button>
      <Route
        exact path="/"
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
            <EditMovieForm
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

export default App;
