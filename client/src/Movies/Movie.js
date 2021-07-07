import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props, { addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  console.log("props: ", props);
  console.log("params: ", params);

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleEditClick = (e) => {
    props.history.push(`/update-movie/${params.id}`);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    console.log("click!");
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log("delete res: ", res);
        props.getMovieList();
        props.history.push("/");
      })
      .catch((err) => {
        console.log("delete err: ", err);
      });
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
      <div onClick={handleEditClick} className="edit-button">
        Edit
      </div>
      <div onClick={handleDeleteClick} className="delete-button">
        Delete
      </div>
    </div>
  );
}

export default Movie;
