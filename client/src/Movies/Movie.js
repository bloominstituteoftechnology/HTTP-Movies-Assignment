import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Link, NavLink, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateMovie from "./UpdateMovie";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };


  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <NavLink className='update-movie' 
      to= {{
        pathname: "/update-movie/:id",
      updateProps: {
        id: params.id,
        movie: movie
      }
      }}
      
      >Update Movie</NavLink>
      <Route path="/update-movie/:id" >
        <UpdateMovie id={params.id} movie={movie}/>
        </Route>
      {/* <Route path="/update-movie/:id" component={UpdateMovie} /> */}
    
      </div>
  );
}

export default Movie;
