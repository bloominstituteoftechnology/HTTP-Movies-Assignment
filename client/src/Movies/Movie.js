import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useParams, useHistory } from "react-router-dom";

// function Movie({ addToSavedList, props }) {
function Movie({ addToSavedList }) {
  // console.log("Movie props", props);
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { id } = useParams();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  // const updateMovie = id => {
  //   history.push(`/update-movie/${id}`)}
  // };

  useEffect(() => {
    //   fetchMovie(match.params.id);
    // }, [match.params.id]);
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div
        className="save-button"
        onClick={() => history.push(`/update-movie/${id}`)}
      >
        Update
      </div>
      <br />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
