import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path='/' component={MovieList} />
      <Route
        path='/movies/:id'
        render={(props) => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      {/* //Add a route at the path /update-movie/:id */}
      <Route path='/update-movie/:id' component={UpdateMovie} />
      <Route path='/add-movie' component={AddMovie} />
    </>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import { Route } from "react-router-dom";
// import SavedList from "./Movies/SavedList";
// import MovieList from "./Movies/MovieList";
// import Movie from "./Movies/Movie";
// import axios from 'axios';
// import UpdateMovies from "./Movies/UpdateMovies"

// const App = () => {
//   const [savedList, setSavedList] = useState([]);
//   const [movieList, setMovieList] = useState([]);

//   const getMovieList = () => {
//     axios
//       .get("http://localhost:5000/api/movies")
//       .then(res => setMovieList(res.data))
//       .catch(err => console.log(err.response));
//   };

//   const addToSavedList = movie => {
//     setSavedList([...savedList, movie]);
//   };

//   useEffect(() => {
//     getMovieList();
//   }, []);

//   return (
//     <>
//       <SavedList list={savedList} />

//       <Route exact path="/">
//         <MovieList movies={movieList} />
//       </Route>

//       <Route path="/movies/:id">
//         <Movie addToSavedList={addToSavedList} />
//       </Route>

//       <Route
//       path="/movies/update-movie/:id"
//       render={()=><UpdateMovies setMOvies = {setMovies}} />
//         {/* <Movie addToSavedList={addToSavedList} /> */}

//     </>
//   );
// };

// export default App;
