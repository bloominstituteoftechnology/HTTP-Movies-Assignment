import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";

const initialMovie = {
  id: 0,
  title: "",
  director: "",
  metascore: "", 
  stars: [""],
};


const AddMovie = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams(); 
  const idNumber = parseInt(id);
  const { push } = useHistory();
  const { setMovieList, movies } = props;



  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/movies/`, movie)
      .then(res => {
        setMovieList(
          movies.map((movie) => {
            if (toString(movie.id) === `${id}`) {
              return res.data; 
            } else {
              return movie;
            }
          })
        );

        setMovie(initialMovie);
        push(`/`);
      })
      .catch();
  };

  const HandleChanges = e => {
    let value = e.target.value;
    let name = e.target.name;

    if (name === "stars") {
      name = [value];
    } 
  
    setMovie({
      ...movie, 
      id: idNumber,
      [name]: value
    });
  };



  return (
    <div className="update-movie-form-container">
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Title"
          onChange={HandleChanges}
          name="title"
          value={movie.title}
        />
        <input
          type="text"
          placeholder="Director"
          onChange={HandleChanges}
          name="director"
          value={movie.director}
        />
        <input
          type="text"
          placeholder="Metascore"
          onChange={HandleChanges}
          name="metascore"
          value={movie.metascore}
        />
        <input
          type="text"
          placeholder="Stars"
          onChange={HandleChanges}
          name="stars"
          value={movie.stars}
        />
        
        <button onClick={handleSubmit}>Add Movie</button>
      </form>
    </div>
  )
};

export default AddMovie;