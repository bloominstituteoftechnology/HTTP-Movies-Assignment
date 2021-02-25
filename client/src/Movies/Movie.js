import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Link ,useHistory} from "react-router-dom";
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
  const updateClick = () =>{
    window.location.href =`/update-movie/${movie.id}`
  }
  
  const deleteClick = () => {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res=>{
        setMovie(res.data);
        console.log(res.data)
        push('/movie');
      })
      .catch(err=>{
        console.log(err);
      })
  }
    const addClick = () =>{
      window.location.href ="/add-movie"
    }
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      
      

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div>
          <button onClick={updateClick} >UpdateMovie</button>
          <button onClick={deleteClick}>Delete Movie</button>
          <button onClick={addClick}>Add Movie</button>
      </div>
    </div>
  );
}

export default Movie;
