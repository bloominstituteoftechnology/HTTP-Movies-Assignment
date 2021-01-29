import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Link ,useHistory} from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params= useParams();
  const {id} = useParams()
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
  
  const deleteClick = () => {
    axios.delete(`http://localhost:5000/api/movies/${id},movielist`)
      .then(res=>{
        setMovie(res.data);
        console.log(res.data)
        push('/movie');
      })
      .catch(err=>{
        console.log(err);
      })
  }
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      
      

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div> 
        <Link to={`/update-movie/${id}`}>
        
        </Link>
        <div>
        <div>
          <button onClick={deleteClick}>Delete Movie</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
