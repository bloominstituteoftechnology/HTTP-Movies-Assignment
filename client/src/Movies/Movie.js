import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams , useHistory} from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory()
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
  const handleClick = () =>{
window.location.href =`/update-movie/${params.id}`    
console.log("here")

  }
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div>
          <button onClick={handleClick} >UpdateMovie</button>
      </div>
    </div>
  );
}

export default Movie;
