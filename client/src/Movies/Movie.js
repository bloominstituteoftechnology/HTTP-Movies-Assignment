import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
// { addToSavedList },
function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const editMovie = () => {
    push(`/update-movie/${params.id}`)
  }

  const deleteMovie = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`)
    .then( res => {
      console.log('delete', res)
      // props.setMovieList(res.data)
      props.toggleLoad()
      push(`/`)
    })
    .catch(err => {
      console.log('error:', err)
    })
  }

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
      <br></br>
      <div className="edit-button" onClick={editMovie}>
        Edit
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
