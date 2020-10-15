import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setIsFetching }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteMovie = () => {
    setIsFetching(true)

  }

  // const deleteHandler = () => {
  //   axios
  //     .delete(`http://localhost:3333/items/${item.id}`)
  //     .then((res) => {
  //       props.setItems(res.data);
  //       push("/item-list");
  //     })
  //     .catch((err) => console.log(err));
  // };

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
      <div>
        <Link to={`/update-movie/${params.id}`}>
        Edit
        </Link>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default Movie;
