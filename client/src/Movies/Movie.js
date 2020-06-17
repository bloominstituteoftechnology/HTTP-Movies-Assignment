import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

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

  // Add a delete button in the movie component that makes a DELETE request
  // When the call comes back successfully, route the user to /movies where they will see the updated movie list without the deleted movie

  /*const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/items/${item.id}`)
      .then(res => {
        // res.data
        props.setItems(res.data);
        push("/item-list");
      })
      .catch(err => console.log(err));
  };

<button className="md-button" onClick={handleDelete}>
        Delete
      </button>
*/
  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      {/* Add a button in the movie component that routes you to your new route with the movies's id as the URL param */}
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
