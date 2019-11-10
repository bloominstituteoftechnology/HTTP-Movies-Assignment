import React, {useState} from 'react';
import axios from 'axios';

function AddMovie(props) {
  const defaultStars = ["", "", ""]
  const defaultMovie = {id: "", title:"", director:"", metascore:"",stars:defaultStars}
  const [newMovie, setNewMovie] = useState(defaultMovie);
  const [stars, setStars] = useState({});
  const handleChange = (event) => {
     setNewMovie({...newMovie, [event.target.name]: event.target.value});
  }

  const handleStars = (event) => {
     setStars({...stars, [event.target.name]: event.target.value});
     setNewMovie({...newMovie, stars:Object.values(stars)})
  }
  const handleSubmit = (event) => {
     event.preventDefault();
     console.log(newMovie);
     axios.post(`http://localhost:5000/api/movies/`, newMovie)
          .then (res => {
             console.log(res);
             props.history.push("/");
             setNewMovie(defaultMovie);
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
         <p>Movie Stars:</p>
         <input type="text"
              onChange={(event) =>handleStars(event)}
              name="index-0"
              placeholder="star-0"
              value={stars[0]}
              require="required"
          /><br />
          <input type="text"
              onChange={(event) =>handleStars(event)}
              name="index-1"
              placeholder="star-1"
              value={stars[1]}
              require="required"
          /><br />
          <input type="text"
              onChange={(event) =>handleStars(event)}
              name="index-2"
              placeholder="star-2"
              value={stars[2]}
              require="required"
          /><br />
       </div>
       <div>
         <button type="submit">Add Movie</button>
       </div>
     </form>
      
    </div>
  )
}

export default AddMovie
