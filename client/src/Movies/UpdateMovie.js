import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";

const initialMovie = {
  id: 0,
  title: "",
  director: "",
  metascore: "", // an integer
  stars: [""],
};

// - (Editing the movie stars can be a stretch problem... don't worry about it now. Move on to the next step, and come back and solve this at the end)


const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams(); //returns "string"
  const idNumber = parseInt(id);
  const { push } = useHistory();
  // console.log("props: ", props)
  const { setMovieList, movies } = props;


  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log("Get movie detail request response", res);
        setMovie(res.data);
      })
      .catch(err => console.log(err));
  }, [id]); // FIRST RENDER

  const changeHandler = e => {
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



  const handleSubmit = e => {
    e.preventDefault();
    // Axios PUT request here (PUT = update)
    // console.log("movie state from UM: ", movie)
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log("res in put request: ", res); 
        // returns updated movie object
        // console.log("movies state: ", movies)
        // console.log("id: ", typeof(idNumber))
        // console.log(idNumber)

        setMovieList(
          movies.map((movie) => {
            if (toString(movie.id) === `${id}`) {
              return res.data; //  single source of truth
              // the server returns a string id, NaN
            } else {
              return movie;
            }
          })
        );
        
        setMovie(initialMovie);// resets form state

        push(`/movies/${id}`);
      })
      .catch(err => console.log(err));
  };


  return (
    <div className="update-movie-form-container">
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Title"
          onChange={changeHandler}
          name="title"
          value={movie.title}
        />
        <input
          type="text"
          placeholder="Director"
          onChange={changeHandler}
          name="director"
          value={movie.director}
        />
        <input
          type="text"
          placeholder="Metascore"
          onChange={changeHandler}
          name="metascore"
          value={movie.metascore}
        />
        <input
          type="text"
          placeholder="Stars"
          onChange={changeHandler}
          name="stars"
          value={movie.stars}
        />
        
        <button onClick={handleSubmit}>Update</button>
      </form>
    </div>
  )
};

export default UpdateMovie;