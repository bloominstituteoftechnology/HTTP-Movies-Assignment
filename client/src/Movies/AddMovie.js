import React, {useState} from 'react';
import axios from 'axios';

function AddMovie(props) {
  const defaultMovie = {id: "", tittle:"", director:"", metascore:"",stars:[]}
  const [newMovie, setNewMovie] = useState(defaultMovie);
  const [stars, setStars] = useState({});
  const handleChange = (event) => {
     setNewMovie({...newMovie, [event.target.name]: event.target.value});
  }

  const handleSubmit = (event) => {
     event.preventDefault();
     axios.post(`http://localhost:5000/api/movies/`, newMovie)
          .then (res => {
             console.log(res);
             props.history.push("/");
          })
          .catch( err => {
             console.log(err);
          })
  }

  return (
    <div className="save-wrapper movie-card">
     <h1>Add a new movie</h1>
     <form onSubmit={handleSubmit}>
       <label>Movie Title:{" "}
       <input type="text"
              onChange={handleChange}
              name="title"
              placeholder="Title"
              value={newMovie.title}
              require="required"
       /></label><br />
       <label>Movie Director:{" "}
       <input type="text"
              onChange={handleChange}
              name="director"
              placeholder="Director"
              value={newMovie.director}
              require="required"
       /></label><br />
       <label>Movie Score:{" "}
       <input type="text"
              onChange={handleChange}
              name="metascore"
              placeholder="Meta Score"
              value={newMovie.metascore}
              require="required"
       /></label><br />
       <div>
         <button type="submit">Add Movie</button>
       </div>
     </form>
      
    </div>
  )
}

export default AddMovie
