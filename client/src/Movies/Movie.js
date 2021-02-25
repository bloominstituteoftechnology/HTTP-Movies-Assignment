import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { useParams , useHistory} from "react-router-dom";
=======
import { useParams,Link ,useHistory} from "react-router-dom";
>>>>>>> e1fa637f0377ea0cd4b62a1491ae34aae30669a7
import MovieCard from "./MovieCard";

function Movie({addToSavedList }) {
  const [movie, setMovie] = useState(null);
<<<<<<< HEAD
  const params = useParams();
  const {push} = useHistory()
=======
  const params= useParams();
  const {id} = useParams()
  const {push} = useHistory()

>>>>>>> e1fa637f0377ea0cd4b62a1491ae34aae30669a7
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
<<<<<<< HEAD
  const handleClick = () =>{
window.location.href =`/update-movie/${params.id}`    
console.log("here")

=======
  
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
>>>>>>> e1fa637f0377ea0cd4b62a1491ae34aae30669a7
  }
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      
      

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
<<<<<<< HEAD
      <div>
          <button onClick={handleClick} >UpdateMovie</button>
=======
      <div> 
        <Link to={`/update-movie/${id}`}>
        
        </Link>
        <div>
        <div>
          <button onClick={deleteClick}>Delete Movie</button>
        </div>
        </div>
>>>>>>> e1fa637f0377ea0cd4b62a1491ae34aae30669a7
      </div>
    </div>
  );
}

export default Movie;
