import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Link } from 'react-router-dom'

function Movie({ addToSavedList }) {
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
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <>
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${params.id}`}>
        <div className="update-button">Update</div>
      </Link>

    </div>
    <Link to={`/`} 
      onClick={() => {
         axios.delete(`http://localhost:5000/api/movies/${params.id}`) 
         .then((res) =>  push("/"))
         .catch((err) => console.log(err))
      }} >
        <div className="delete-button">Delete</div>
    </Link>
    </>
  );
}

export default Movie;

{/* <Button
variant="contained"
// className={classes.button_style}
// onClick={handleSubmit}
// disabled={loading}
onClick={() => {
    axiosWithAuth()
    .delete(`/api/friends/${friend.id}`)
}}
style={{
  background: "#F50057",
  color: "#fff",
  margin: ".5em .5em",
}}
>
Delete Friend
</Button> */}